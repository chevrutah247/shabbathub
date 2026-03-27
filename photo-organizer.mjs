#!/usr/bin/env node
/**
 * Photo Organizer v2 for Synology NAS
 *
 * Phases:
 *   1. clean        - Delete old _ДУБЛИКАТЫ folder
 *   2. index        - Index all files (size, hash, type, date)
 *   3. sort-years   - Sort ALL files into year folders (plan only)
 *   4. apply-sort   - Execute the sort plan
 *   5. find-dupes   - Find duplicates within each year folder
 *   6. move-dupes   - Move duplicates into Дубликаты/ subfolder per year
 *   7. cleanup      - Remove empty folders left behind
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { execSync } from 'child_process';

const BASE_DIR = '/Volumes/home/MacBook/ 📸 SYNOLOGY ФОТОГРАФИИ/Восстановлено1';
const INDEX_FILE = '/tmp/photo-organizer-index.json';
const SORT_PLAN_FILE = '/tmp/photo-organizer-sort-plan.json';
const DUPES_REPORT_FILE = '/tmp/photo-organizer-dupes-report.json';

const PHASE = process.argv[2] || 'help';

// Folders we create/manage - skip during indexing
const MANAGED_FOLDERS = new Set(['_ДУБЛИКАТЫ', '_СОРТИРОВКА', 'Дубликаты']);

// File type categories
const PHOTO_EXTS = new Set(['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'tif', 'heic', 'heif', 'webp', 'raw', 'cr2', 'nef', 'arw', 'dng', 'svg']);
const VIDEO_EXTS = new Set(['mp4', 'mov', 'avi', 'mkv', 'wmv', 'flv', 'webm', 'mpg', 'mpeg', 'm4v', '3gp', 'mts']);
const AUDIO_EXTS = new Set(['mp3', 'wav', 'aac', 'flac', 'ogg', 'm4a', 'wma']);
const DOC_EXTS = new Set(['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'rtf', 'htm', 'html', 'csv']);

function getFileCategory(ext) {
  ext = (ext || '').toLowerCase().replace(/^\./, '');
  if (PHOTO_EXTS.has(ext)) return 'photo';
  if (VIDEO_EXTS.has(ext)) return 'video';
  if (AUDIO_EXTS.has(ext)) return 'audio';
  if (DOC_EXTS.has(ext)) return 'document';
  return 'other';
}

function partialHash(filePath, bytes = 8192) {
  try {
    const fd = fs.openSync(filePath, 'r');
    const buf = Buffer.alloc(bytes);
    const bytesRead = fs.readSync(fd, buf, 0, bytes, 0);
    fs.closeSync(fd);
    return crypto.createHash('md5').update(buf.subarray(0, bytesRead)).digest('hex');
  } catch {
    return null;
  }
}

function fullHash(filePath) {
  try {
    const hash = crypto.createHash('md5');
    const data = fs.readFileSync(filePath);
    hash.update(data);
    return hash.digest('hex');
  } catch {
    return null;
  }
}

function getFileDate(filePath) {
  try {
    const stat = fs.statSync(filePath);
    const dates = [stat.mtime, stat.birthtime].filter(d => d && d.getFullYear() > 1990);
    if (dates.length === 0) return null;
    dates.sort((a, b) => a - b);
    return dates[0];
  } catch {
    return null;
  }
}

// Try to extract year from FOLDER names in path (not from filenames!)
function extractYearFromPath(relPath) {
  const parts = relPath.split('/');
  // Only look at folder components, skip the last part (filename)
  const folders = parts.slice(0, -1);

  for (const part of folders) {
    // Skip common camera folders like 100APPLE, DCIM, etc.
    if (/^\d{3}[A-Z]/.test(part) || part === 'DCIM') continue;

    // Exact 4-digit year folder
    if (/^(19|20)\d{2}$/.test(part)) return parseInt(part);
    // Year at start followed by non-digit: "202109__", "201402__"
    const startMatch = part.match(/^((?:19|20)\d{2})\D/);
    if (startMatch) return parseInt(startMatch[1]);
    // Year anywhere in the name: "ПЕЧАТЬ декабрь 2020", "11 июля 2021 Парк"
    const anyMatch = part.match(/(?:^|\D)((?:19|20)\d{2})(?:\D|$)/);
    if (anyMatch) return parseInt(anyMatch[1]);
  }
  return null;
}

// Recursively list all files
function* walkDir(dir, depth = 0) {
  const basename = path.basename(dir);
  if (MANAGED_FOLDERS.has(basename)) return;
  if (basename.startsWith('@') || basename === '#recycle') return;

  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch (err) {
    console.error(`  Cannot read: ${dir} (${err.message})`);
    return;
  }

  for (const entry of entries) {
    if (entry.name === '.DS_Store' || entry.name === '.Thumbs.db' || entry.name === 'Thumbs.db') continue;
    if (entry.name.startsWith('._')) continue;

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      yield* walkDir(fullPath, depth + 1);
    } else if (entry.isFile()) {
      yield { path: fullPath, name: entry.name, depth };
    }
  }
}

// Safely move a file, handling name collisions
function safeMove(srcPath, destPath) {
  const destDir = path.dirname(destPath);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  let finalDest = destPath;
  if (fs.existsSync(finalDest)) {
    const ext = path.extname(destPath);
    const base = path.basename(destPath, ext);
    let counter = 1;
    while (fs.existsSync(finalDest)) {
      finalDest = path.join(destDir, `${base}_${counter}${ext}`);
      counter++;
    }
  }

  fs.renameSync(srcPath, finalDest);
  return finalDest;
}

// Remove empty directories recursively
function removeEmptyDirs(dir) {
  if (!fs.existsSync(dir)) return;

  let entries = fs.readdirSync(dir, { withFileTypes: true });

  // First, recurse into subdirs
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const subdir = path.join(dir, entry.name);
      if (!MANAGED_FOLDERS.has(entry.name)) {
        removeEmptyDirs(subdir);
      }
    }
  }

  // Re-read after cleaning subdirs
  entries = fs.readdirSync(dir);
  // Filter out .DS_Store
  const realEntries = entries.filter(e => e !== '.DS_Store' && e !== 'Thumbs.db');

  if (realEntries.length === 0 && dir !== BASE_DIR) {
    // Remove .DS_Store if present, then remove dir
    for (const junk of entries) {
      try { fs.unlinkSync(path.join(dir, junk)); } catch {}
    }
    try {
      fs.rmdirSync(dir);
      return true;
    } catch {}
  }
  return false;
}

// ============================================================
// Phase: CLEAN - Delete old _ДУБЛИКАТЫ folder
// ============================================================
async function phaseClean() {
  console.log('=== Удаление старой папки _ДУБЛИКАТЫ ===\n');

  const oldDupesDir = path.join(BASE_DIR, '_ДУБЛИКАТЫ');

  if (!fs.existsSync(oldDupesDir)) {
    console.log('Папка _ДУБЛИКАТЫ не найдена. Пропускаем.');
    return;
  }

  // Count files first
  let fileCount = 0;
  for (const _ of walkDirUnrestricted(oldDupesDir)) {
    fileCount++;
    if (fileCount % 1000 === 0) process.stdout.write(`\r  Подсчёт: ${fileCount}...`);
  }
  console.log(`\r  Файлов в _ДУБЛИКАТЫ: ${fileCount}`);
  console.log('  Удаляем...');

  fs.rmSync(oldDupesDir, { recursive: true, force: true });

  console.log('  Готово! Папка _ДУБЛИКАТЫ удалена.');
}

// Walk without restrictions (for counting files in managed folders)
function* walkDirUnrestricted(dir) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch { return; }

  for (const entry of entries) {
    if (entry.name === '.DS_Store') continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkDirUnrestricted(fullPath);
    } else if (entry.isFile()) {
      yield fullPath;
    }
  }
}

// ============================================================
// Phase: INDEX - Scan all files
// ============================================================
async function phaseIndex() {
  console.log('=== Индексация файлов ===\n');
  console.log(`Папка: ${BASE_DIR}`);

  const files = [];
  let count = 0;
  let errors = 0;

  for (const fileInfo of walkDir(BASE_DIR)) {
    count++;
    if (count % 200 === 0) process.stdout.write(`\r  Сканирование: ${count} файлов...`);

    try {
      const stat = fs.statSync(fileInfo.path);
      const ext = path.extname(fileInfo.name).toLowerCase().replace(/^\./, '');
      const category = getFileCategory(ext);
      const relPath = path.relative(BASE_DIR, fileInfo.path);

      // Determine the source folder (first directory component)
      const sourceFolder = relPath.includes('/') ? relPath.split('/')[0] : '_корень_';

      files.push({
        path: fileInfo.path,
        rel: relPath,
        name: fileInfo.name,
        size: stat.size,
        ext,
        category,
        mtime: stat.mtime.toISOString(),
        birthtime: stat.birthtime ? stat.birthtime.toISOString() : null,
        depth: fileInfo.depth,
        sourceFolder,
      });
    } catch (err) {
      errors++;
    }
  }

  console.log(`\r  Просканировано: ${count} файлов, ${errors} ошибок\n`);

  fs.writeFileSync(INDEX_FILE, JSON.stringify(files, null, 2));
  console.log(`Индекс сохранён: ${INDEX_FILE}`);

  // Summary
  const byCategory = {};
  const byFolder = {};
  let totalSize = 0;

  for (const f of files) {
    byCategory[f.category] = (byCategory[f.category] || 0) + 1;
    byFolder[f.sourceFolder] = (byFolder[f.sourceFolder] || 0) + 1;
    totalSize += f.size;
  }

  console.log(`\n=== Итоги ===`);
  console.log(`Всего файлов: ${files.length}`);
  console.log(`Общий размер: ${(totalSize / 1024 / 1024 / 1024).toFixed(2)} ГБ`);
  console.log(`\nПо категориям:`);
  for (const [cat, cnt] of Object.entries(byCategory).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${cat}: ${cnt}`);
  }
  console.log(`\nТоп-20 папок по количеству файлов:`);
  for (const [folder, cnt] of Object.entries(byFolder).sort((a, b) => b[1] - a[1]).slice(0, 20)) {
    console.log(`  ${folder}: ${cnt}`);
  }
}

// ============================================================
// Phase: SORT-YEARS - Plan sorting ALL files by year
// ============================================================
async function phaseSortYears() {
  console.log('=== Планирование сортировки по годам ===\n');

  if (!fs.existsSync(INDEX_FILE)) {
    console.log('Индекс не найден. Сначала выполните: node photo-organizer.mjs index');
    return;
  }

  const files = JSON.parse(fs.readFileSync(INDEX_FILE, 'utf-8'));
  console.log(`Загружено ${files.length} файлов из индекса\n`);

  const plan = [];
  const yearStats = {};
  let noYear = 0;

  for (const f of files) {
    // Determine year: first try path, then file dates
    let year = extractYearFromPath(f.rel);

    if (!year) {
      // Prefer mtime over birthtime - files were restored in 2026 so birthtime is unreliable
      const mt = new Date(f.mtime);
      const bt = new Date(f.birthtime);

      // Use mtime first (original modification date), fall back to birthtime
      // Ignore 2026 birthtime as it's the restoration date
      let fileDate = null;
      if (!isNaN(mt.getTime()) && mt.getFullYear() >= 1995 && mt.getFullYear() <= 2025) {
        fileDate = mt;
      } else if (!isNaN(bt.getTime()) && bt.getFullYear() >= 1995 && bt.getFullYear() <= 2025) {
        fileDate = bt;
      }

      if (fileDate) {
        year = fileDate.getFullYear();
      }
    }

    if (!year) {
      year = 'Неизвестный_год';
      noYear++;
    }

    const yearStr = String(year);

    // Build destination path: YEAR/category/original_name
    // Prefix filename with source folder for context (if not root)
    let destName = f.name;
    if (f.sourceFolder !== '_корень_') {
      // Add source folder prefix to avoid losing context
      // e.g. "ева/photo.jpg" -> "2020/Фото/[ева] photo.jpg"
      destName = `[${f.sourceFolder}] ${f.name}`;
    }

    let subdir;
    if (f.category === 'photo') subdir = 'Фото';
    else if (f.category === 'video') subdir = 'Видео';
    else if (f.category === 'audio') subdir = 'Аудио';
    else if (f.category === 'document') subdir = 'Документы';
    else subdir = 'Прочее';

    const destRel = path.join(yearStr, subdir, destName);

    plan.push({
      from: f.rel,
      fromAbs: f.path,
      to: destRel,
      year: yearStr,
      category: f.category,
      size: f.size,
    });

    yearStats[yearStr] = (yearStats[yearStr] || 0) + 1;
  }

  // Summary
  console.log('=== План сортировки ===\n');
  console.log('Файлов по годам:');
  for (const [year, cnt] of Object.entries(yearStats).sort()) {
    console.log(`  ${year}: ${cnt}`);
  }
  if (noYear > 0) {
    console.log(`\n  Без определённого года: ${noYear}`);
  }

  fs.writeFileSync(SORT_PLAN_FILE, JSON.stringify(plan, null, 2));
  console.log(`\nПлан сохранён: ${SORT_PLAN_FILE}`);
  console.log(`Всего файлов к перемещению: ${plan.length}`);
  console.log('\nДля выполнения запустите: node photo-organizer.mjs apply-sort');
}

// ============================================================
// Phase: APPLY-SORT - Execute the sort plan
// ============================================================
async function phaseApplySort() {
  console.log('=== Выполнение сортировки по годам ===\n');

  if (!fs.existsSync(SORT_PLAN_FILE)) {
    console.log('План не найден. Сначала: node photo-organizer.mjs sort-years');
    return;
  }

  const plan = JSON.parse(fs.readFileSync(SORT_PLAN_FILE, 'utf-8'));
  console.log(`Файлов к перемещению: ${plan.length}\n`);

  let moved = 0;
  let failed = 0;
  let skipped = 0;
  const startTime = Date.now();

  for (const item of plan) {
    const srcPath = item.fromAbs || path.join(BASE_DIR, item.from);
    const destPath = path.join(BASE_DIR, item.to);

    try {
      if (!fs.existsSync(srcPath)) {
        skipped++;
        continue;
      }

      safeMove(srcPath, destPath);
      moved++;
    } catch (err) {
      // If rename fails (cross-device), try copy+delete
      try {
        const destDir = path.dirname(destPath);
        if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
        fs.copyFileSync(srcPath, destPath);
        fs.unlinkSync(srcPath);
        moved++;
      } catch (err2) {
        console.error(`  Ошибка: ${item.from} -> ${err2.message}`);
        failed++;
      }
    }

    const total = moved + failed + skipped;
    if (total % 200 === 0) {
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(0);
      const pct = ((total / plan.length) * 100).toFixed(1);
      process.stdout.write(`\r  ${pct}% | Перемещено: ${moved} | Ошибки: ${failed} | Пропущено: ${skipped} | ${elapsed}с`);
    }
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(0);
  console.log(`\r\n\nГотово за ${elapsed}с!`);
  console.log(`  Перемещено: ${moved}`);
  console.log(`  Ошибок: ${failed}`);
  console.log(`  Пропущено (не найдены): ${skipped}`);
  console.log('\nДалее: node photo-organizer.mjs cleanup  (удалить пустые папки)');
  console.log('Затем: node photo-organizer.mjs find-dupes  (найти дубликаты)');
}

// ============================================================
// Phase: FIND-DUPES - Find duplicates within each year folder
// ============================================================
async function phaseFindDupes() {
  console.log('=== Поиск дубликатов внутри папок-годов ===\n');

  // Scan the sorted structure
  const yearDirs = [];
  const entries = fs.readdirSync(BASE_DIR, { withFileTypes: true });
  for (const e of entries) {
    if (e.isDirectory() && /^(19|20)\d{2}$/.test(e.name)) {
      yearDirs.push(e.name);
    }
  }
  // Also check "Неизвестный_год"
  if (fs.existsSync(path.join(BASE_DIR, 'Неизвестный_год'))) {
    yearDirs.push('Неизвестный_год');
  }

  yearDirs.sort();
  console.log(`Найдено ${yearDirs.length} папок-годов: ${yearDirs.join(', ')}\n`);

  const allDupeGroups = [];
  let totalDupes = 0;
  let totalWasted = 0;

  for (const yearDir of yearDirs) {
    const yearPath = path.join(BASE_DIR, yearDir);
    process.stdout.write(`  ${yearDir}: сканирование...`);

    // Collect all files in this year folder (excluding Дубликаты subfolder)
    const files = [];
    for (const fileInfo of walkDir(yearPath)) {
      try {
        const stat = fs.statSync(fileInfo.path);
        if (stat.size < 1024) continue; // skip tiny files
        files.push({
          path: fileInfo.path,
          rel: path.relative(BASE_DIR, fileInfo.path),
          name: fileInfo.name,
          size: stat.size,
        });
      } catch {}
    }

    process.stdout.write(` ${files.length} файлов...`);

    // Group by size
    const bySize = {};
    for (const f of files) {
      if (!bySize[f.size]) bySize[f.size] = [];
      bySize[f.size].push(f);
    }

    const sizeGroups = Object.values(bySize).filter(g => g.length > 1);
    const yearDupes = [];

    for (const group of sizeGroups) {
      // Partial hash
      const byHash = {};
      for (const f of group) {
        const h = partialHash(f.path);
        if (!h) continue;
        if (!byHash[h]) byHash[h] = [];
        byHash[h].push(f);
      }

      for (const hashGroup of Object.values(byHash)) {
        if (hashGroup.length <= 1) continue;

        // Full hash verification for files < 100MB
        if (hashGroup[0].size < 100 * 1024 * 1024) {
          const byFull = {};
          for (const f of hashGroup) {
            const fh = fullHash(f.path);
            if (!fh) continue;
            if (!byFull[fh]) byFull[fh] = [];
            byFull[fh].push(f);
          }
          for (const fullGroup of Object.values(byFull)) {
            if (fullGroup.length > 1) yearDupes.push(fullGroup);
          }
        } else {
          yearDupes.push(hashGroup);
        }
      }
    }

    let yearWasted = 0;
    let yearDupeCount = 0;
    for (const group of yearDupes) {
      yearWasted += group[0].size * (group.length - 1);
      yearDupeCount += group.length - 1;
    }

    if (yearDupes.length > 0) {
      console.log(` -> ${yearDupes.length} групп дубликатов (${yearDupeCount} файлов, ${(yearWasted / 1024 / 1024).toFixed(1)} МБ)`);
      allDupeGroups.push({ year: yearDir, groups: yearDupes });
      totalDupes += yearDupeCount;
      totalWasted += yearWasted;
    } else {
      console.log(` -> нет дубликатов`);
    }
  }

  console.log(`\n=== Итого ===`);
  console.log(`Групп дубликатов: ${allDupeGroups.reduce((s, y) => s + y.groups.length, 0)}`);
  console.log(`Файлов-дубликатов: ${totalDupes}`);
  console.log(`Потрачено места: ${(totalWasted / 1024 / 1024).toFixed(1)} МБ`);

  // Save report
  const report = allDupeGroups.map(yearData => ({
    year: yearData.year,
    groups: yearData.groups.map(group => ({
      size: group[0].size,
      count: group.length,
      keep: group[0].rel,
      duplicates: group.slice(1).map(f => f.rel),
    })),
  }));

  fs.writeFileSync(DUPES_REPORT_FILE, JSON.stringify(report, null, 2));
  console.log(`\nОтчёт сохранён: ${DUPES_REPORT_FILE}`);
  console.log('\nДля перемещения дубликатов: node photo-organizer.mjs move-dupes');

  // Show samples
  console.log('\n=== Примеры дубликатов ===');
  let shown = 0;
  for (const yearData of allDupeGroups) {
    for (const group of yearData.groups.slice(0, 3)) {
      if (shown >= 10) break;
      console.log(`\n  [${yearData.year}] Размер: ${(group[0].size / 1024).toFixed(0)} КБ`);
      console.log(`  ОРИГИНАЛ: ${group[0].rel}`);
      for (const f of group.slice(1)) {
        console.log(`  ДУБЛИКАТ: ${f.rel}`);
      }
      shown++;
    }
    if (shown >= 10) break;
  }
}

// ============================================================
// Phase: MOVE-DUPES - Move duplicates into Дубликаты/ per year
// ============================================================
async function phaseMoveDupes() {
  console.log('=== Перемещение дубликатов в подпапки Дубликаты/ ===\n');

  if (!fs.existsSync(DUPES_REPORT_FILE)) {
    console.log('Отчёт не найден. Сначала: node photo-organizer.mjs find-dupes');
    return;
  }

  const report = JSON.parse(fs.readFileSync(DUPES_REPORT_FILE, 'utf-8'));
  let totalToMove = 0;
  for (const yearData of report) {
    for (const group of yearData.groups) {
      totalToMove += group.duplicates.length;
    }
  }
  console.log(`Дубликатов к перемещению: ${totalToMove}\n`);

  let moved = 0;
  let failed = 0;
  let skipped = 0;

  for (const yearData of report) {
    const yearDupesDir = path.join(BASE_DIR, yearData.year, 'Дубликаты');

    for (const group of yearData.groups) {
      for (const dupeRel of group.duplicates) {
        const srcPath = path.join(BASE_DIR, dupeRel);

        if (!fs.existsSync(srcPath)) {
          skipped++;
          continue;
        }

        // Destination: YEAR/Дубликаты/filename
        // Preserve subdirectory context in filename
        const relFromYear = path.relative(path.join(BASE_DIR, yearData.year), srcPath);
        const flatName = relFromYear.includes(path.sep)
          ? relFromYear.replace(/[/\\]/g, ' - ')
          : path.basename(srcPath);

        const destPath = path.join(yearDupesDir, flatName);

        try {
          safeMove(srcPath, destPath);
          moved++;
        } catch (err) {
          try {
            const destDir = path.dirname(destPath);
            if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
            fs.copyFileSync(srcPath, destPath);
            fs.unlinkSync(srcPath);
            moved++;
          } catch (err2) {
            console.error(`  Ошибка: ${dupeRel} -> ${err2.message}`);
            failed++;
          }
        }

        const total = moved + failed + skipped;
        if (total % 100 === 0) {
          process.stdout.write(`\r  Перемещено: ${moved} | Ошибки: ${failed} | Пропущено: ${skipped}`);
        }
      }
    }
  }

  console.log(`\r\n\nГотово!`);
  console.log(`  Перемещено: ${moved}`);
  console.log(`  Ошибок: ${failed}`);
  console.log(`  Пропущено: ${skipped}`);

  // Show which year folders now have Дубликаты
  console.log('\nПапки с дубликатами:');
  for (const yearData of report) {
    const dupesDir = path.join(BASE_DIR, yearData.year, 'Дубликаты');
    if (fs.existsSync(dupesDir)) {
      try {
        const count = fs.readdirSync(dupesDir).filter(f => f !== '.DS_Store').length;
        console.log(`  ${yearData.year}/Дубликаты/ -> ${count} файлов`);
      } catch {}
    }
  }
}

// ============================================================
// Phase: CLEANUP - Remove empty folders
// ============================================================
async function phaseCleanup() {
  console.log('=== Удаление пустых папок ===\n');

  let removed = 0;
  const entries = fs.readdirSync(BASE_DIR, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (MANAGED_FOLDERS.has(entry.name)) continue;

    const dirPath = path.join(BASE_DIR, entry.name);
    // Check if folder and all subfolders are empty
    const result = removeEmptyDirs(dirPath);
    if (result) {
      console.log(`  Удалена: ${entry.name}/`);
      removed++;
    }
  }

  // Also remove empty dirs inside year folders
  const yearEntries = fs.readdirSync(BASE_DIR, { withFileTypes: true });
  for (const e of yearEntries) {
    if (e.isDirectory() && (/^(19|20)\d{2}$/.test(e.name) || e.name === 'Неизвестный_год')) {
      const yearPath = path.join(BASE_DIR, e.name);
      removeEmptyDirs(yearPath);
    }
  }

  console.log(`\nУдалено пустых папок: ${removed}`);

  // Show remaining structure
  console.log('\n=== Текущая структура ===');
  const remaining = fs.readdirSync(BASE_DIR, { withFileTypes: true });
  for (const e of remaining.sort((a, b) => a.name.localeCompare(b.name))) {
    if (e.isDirectory()) {
      try {
        const sub = fs.readdirSync(path.join(BASE_DIR, e.name), { withFileTypes: true });
        const subDirs = sub.filter(s => s.isDirectory()).map(s => s.name);
        console.log(`  📁 ${e.name}/ (${subDirs.length > 0 ? subDirs.join(', ') : 'файлы'})`);
      } catch {
        console.log(`  📁 ${e.name}/`);
      }
    }
  }
}

// ============================================================
// MAIN
// ============================================================
async function main() {
  console.log('📸 Photo Organizer v2 - Сортировка по годам\n');

  if (PHASE !== 'help' && !fs.existsSync(BASE_DIR)) {
    console.error(`Папка не найдена: ${BASE_DIR}`);
    console.error('Убедитесь что Synology подключен.');
    process.exit(1);
  }

  switch (PHASE) {
    case 'clean':
      await phaseClean();
      break;
    case 'index':
      await phaseIndex();
      break;
    case 'sort-years':
      await phaseSortYears();
      break;
    case 'apply-sort':
      await phaseApplySort();
      break;
    case 'find-dupes':
      await phaseFindDupes();
      break;
    case 'move-dupes':
      await phaseMoveDupes();
      break;
    case 'cleanup':
      await phaseCleanup();
      break;
    default:
      console.log('Использование:\n');
      console.log('  Шаг 1: node photo-organizer.mjs clean        # Удалить старую папку _ДУБЛИКАТЫ');
      console.log('  Шаг 2: node photo-organizer.mjs index        # Проиндексировать все файлы');
      console.log('  Шаг 3: node photo-organizer.mjs sort-years   # Создать план сортировки по годам');
      console.log('  Шаг 4: node photo-organizer.mjs apply-sort   # Выполнить сортировку');
      console.log('  Шаг 5: node photo-organizer.mjs cleanup      # Удалить пустые папки');
      console.log('  Шаг 6: node photo-organizer.mjs find-dupes   # Найти дубликаты в каждом году');
      console.log('  Шаг 7: node photo-organizer.mjs move-dupes   # Переместить дубликаты в подпапки');
      console.log('\nРезультат:');
      console.log('  2019/');
      console.log('    Фото/');
      console.log('    Видео/');
      console.log('    Дубликаты/    <- для сравнения');
      console.log('  2020/');
      console.log('    Фото/');
      console.log('    Видео/');
      console.log('    Дубликаты/');
      console.log('  ...');
  }
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
