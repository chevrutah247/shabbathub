#!/usr/bin/env node
/**
 * Photo Restructure - flatten everything into Фото/Видео/Аудио by year
 *
 * Steps:
 *   1. Scan all files
 *   2. Delete documents, CSV, and other non-media files
 *   3. Move photos → Фото/YEAR/, videos → Видео/YEAR/, audio → Аудио/YEAR/
 *   4. Remove empty folders
 *   5. Delete temp reports
 */

import fs from 'fs';
import path from 'path';

const BASE_DIR = '/Volumes/home/MacBook/ 📸 SYNOLOGY ФОТОГРАФИИ/Восстановлено1';

const PHOTO_EXTS = new Set(['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'tif', 'heic', 'heif', 'webp', 'raw', 'cr2', 'nef', 'arw', 'dng', 'svg']);
const VIDEO_EXTS = new Set(['mp4', 'mov', 'avi', 'mkv', 'wmv', 'flv', 'webm', 'mpg', 'mpeg', 'm4v', '3gp', 'mts']);
const AUDIO_EXTS = new Set(['mp3', 'wav', 'aac', 'flac', 'ogg', 'm4a', 'wma']);

// Target top-level folders - skip when scanning source files
const TARGET_FOLDERS = new Set(['Фото', 'Видео', 'Аудио']);

function getCategory(ext) {
  ext = (ext || '').toLowerCase().replace(/^\./, '');
  if (PHOTO_EXTS.has(ext)) return 'photo';
  if (VIDEO_EXTS.has(ext)) return 'video';
  if (AUDIO_EXTS.has(ext)) return 'audio';
  return 'other';
}

function getYearFromPath(filePath, relPath) {
  // Try to find year from folder structure (e.g. /2005/Фото/file.jpg)
  const parts = relPath.split('/');
  for (const part of parts) {
    if (/^(19|20)\d{2}$/.test(part)) return part;
    // Year at start of folder name: "2016-02-17"
    const m = part.match(/^((?:19|20)\d{2})\D/);
    if (m) return m[1];
    // Year anywhere: "ПЕЧАТЬ декабрь 2020"
    const m2 = part.match(/(?:^|\D)((?:19|20)\d{2})(?:\D|$)/);
    if (m2 && parseInt(m2[1]) >= 1995 && parseInt(m2[1]) <= 2025) return m2[1];
  }

  // Fall back to file date
  try {
    const stat = fs.statSync(filePath);
    const mt = stat.mtime;
    if (mt && mt.getFullYear() >= 1995 && mt.getFullYear() <= 2025) {
      return String(mt.getFullYear());
    }
    const bt = stat.birthtime;
    if (bt && bt.getFullYear() >= 1995 && bt.getFullYear() <= 2025) {
      return String(bt.getFullYear());
    }
  } catch {}

  return 'Разное';
}

// Clean filename - remove [source] prefixes added by previous sort
function cleanFilename(name) {
  return name.replace(/^\[.*?\]\s*/, '');
}

function* walkAll(dir) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch { return; }

  for (const entry of entries) {
    if (entry.name === '.DS_Store' || entry.name === 'Thumbs.db' || entry.name.startsWith('._')) continue;
    if (entry.name === '#recycle') continue;

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      yield* walkAll(fullPath);
    } else if (entry.isFile()) {
      yield fullPath;
    }
  }
}

function safeMove(src, dest) {
  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

  let finalDest = dest;
  if (fs.existsSync(finalDest)) {
    const ext = path.extname(dest);
    const base = path.basename(dest, ext);
    let counter = 1;
    while (fs.existsSync(finalDest)) {
      finalDest = path.join(destDir, `${base}_${counter}${ext}`);
      counter++;
    }
  }

  try {
    fs.renameSync(src, finalDest);
  } catch {
    // Cross-device or permission issue - try copy+delete
    try {
      fs.copyFileSync(src, finalDest);
      fs.unlinkSync(src);
    } catch (err) {
      throw err;
    }
  }
  return finalDest;
}

function removeEmptyDirs(dir) {
  if (!fs.existsSync(dir)) return;
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch { return; }

  for (const entry of entries) {
    if (entry.isDirectory()) {
      removeEmptyDirs(path.join(dir, entry.name));
    }
  }

  // Re-read after cleaning subdirs
  entries = fs.readdirSync(dir);
  const real = entries.filter(e => e !== '.DS_Store' && e !== 'Thumbs.db');

  if (real.length === 0 && dir !== BASE_DIR) {
    // Remove junk files first
    for (const junk of entries) {
      try { fs.unlinkSync(path.join(dir, junk)); } catch {}
    }
    try { fs.rmdirSync(dir); } catch {}
  }
}

async function main() {
  console.log('📸 Photo Restructure\n');

  if (!fs.existsSync(BASE_DIR)) {
    console.error('NAS не доступен:', BASE_DIR);
    process.exit(1);
  }

  // Step 1: Scan everything EXCEPT the target folders (Фото, Видео, Аудио)
  console.log('=== Шаг 1: Сканирование файлов ===\n');

  const allFiles = [];
  let scanCount = 0;

  // First, scan files inside year folders and other old folders
  for (const filePath of walkAll(BASE_DIR)) {
    scanCount++;
    if (scanCount % 500 === 0) process.stdout.write(`\r  Сканирование: ${scanCount}...`);

    const relPath = path.relative(BASE_DIR, filePath);
    const topFolder = relPath.split('/')[0];

    // Skip files already in target structure (Фото/2020/file.jpg)
    if (TARGET_FOLDERS.has(topFolder)) continue;

    const ext = path.extname(filePath).toLowerCase().replace(/^\./, '');
    const category = getCategory(ext);
    const year = getYearFromPath(filePath, relPath);

    allFiles.push({ path: filePath, rel: relPath, ext, category, year, name: path.basename(filePath) });
  }

  console.log(`\r  Найдено: ${allFiles.length} файлов (из ${scanCount} просканированных)\n`);

  // Stats
  const stats = { photo: 0, video: 0, audio: 0, other: 0 };
  for (const f of allFiles) stats[f.category]++;
  console.log(`  Фото: ${stats.photo}`);
  console.log(`  Видео: ${stats.video}`);
  console.log(`  Аудио: ${stats.audio}`);
  console.log(`  Документы/прочее (будут удалены): ${stats.other}\n`);

  // Step 2: Delete non-media files
  console.log('=== Шаг 2: Удаление документов и прочего ===\n');

  let deleted = 0;
  let deleteFailed = 0;

  for (const f of allFiles) {
    if (f.category === 'other') {
      try {
        fs.unlinkSync(f.path);
        deleted++;
      } catch {
        deleteFailed++;
      }
      if ((deleted + deleteFailed) % 100 === 0) {
        process.stdout.write(`\r  Удалено: ${deleted}, ошибок: ${deleteFailed}`);
      }
    }
  }

  console.log(`\r  Удалено: ${deleted}, ошибок: ${deleteFailed}\n`);

  // Step 3: Move media to new structure
  console.log('=== Шаг 3: Перемещение в новую структуру ===\n');

  const categoryDirMap = { photo: 'Фото', video: 'Видео', audio: 'Аудио' };
  let moved = 0;
  let moveFailed = 0;
  let skipped = 0;
  const startTime = Date.now();
  const mediaFiles = allFiles.filter(f => f.category !== 'other');

  for (const f of mediaFiles) {
    if (!fs.existsSync(f.path)) { skipped++; continue; }

    const targetDir = categoryDirMap[f.category];
    const cleanName = cleanFilename(f.name);
    const destPath = path.join(BASE_DIR, targetDir, f.year, cleanName);

    try {
      safeMove(f.path, destPath);
      moved++;
    } catch (err) {
      moveFailed++;
    }

    const total = moved + moveFailed + skipped;
    if (total % 200 === 0) {
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(0);
      const pct = ((total / mediaFiles.length) * 100).toFixed(1);
      process.stdout.write(`\r  ${pct}% | Перемещено: ${moved} | Ошибки: ${moveFailed} | ${elapsed}с`);
    }
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(0);
  console.log(`\r\n  Перемещено: ${moved} | Ошибки: ${moveFailed} | Пропущено: ${skipped} | ${elapsed}с\n`);

  // Step 4: Remove empty folders
  console.log('=== Шаг 4: Удаление пустых папок ===\n');

  removeEmptyDirs(BASE_DIR);

  // Also clean inside target folders - remove any empty year subdirs
  for (const target of TARGET_FOLDERS) {
    const targetPath = path.join(BASE_DIR, target);
    if (fs.existsSync(targetPath)) removeEmptyDirs(targetPath);
  }

  console.log('  Готово\n');

  // Step 5: Delete temp files
  console.log('=== Шаг 5: Удаление временных файлов ===\n');

  const tempFiles = [
    '/tmp/photo-organizer-index.json',
    '/tmp/photo-organizer-sort-plan.json',
    '/tmp/photo-organizer-dupes-report.json',
  ];
  for (const f of tempFiles) {
    if (fs.existsSync(f)) {
      fs.unlinkSync(f);
      console.log(`  Удалён: ${f}`);
    }
  }

  // Step 6: Show final structure
  console.log('\n=== Финальная структура ===\n');

  const topEntries = fs.readdirSync(BASE_DIR, { withFileTypes: true })
    .filter(e => e.isDirectory() && e.name !== '#recycle')
    .sort((a, b) => a.name.localeCompare(b.name));

  for (const entry of topEntries) {
    const entryPath = path.join(BASE_DIR, entry.name);
    try {
      const subs = fs.readdirSync(entryPath, { withFileTypes: true })
        .filter(e => e.name !== '.DS_Store')
        .sort((a, b) => a.name.localeCompare(b.name));

      if (TARGET_FOLDERS.has(entry.name)) {
        // Show year subfolders with file counts
        const years = subs.filter(s => s.isDirectory());
        console.log(`📁 ${entry.name}/ (${years.length} годов)`);
        for (const year of years) {
          const yearPath = path.join(entryPath, year.name);
          try {
            const files = fs.readdirSync(yearPath).filter(f => f !== '.DS_Store');
            console.log(`   📁 ${year.name}/ → ${files.length} файлов`);
          } catch {
            console.log(`   📁 ${year.name}/`);
          }
        }
      } else {
        const fileCount = subs.length;
        console.log(`📁 ${entry.name}/ (${fileCount} элементов) ← не перемещено (EPERM)`);
      }
    } catch {
      console.log(`📁 ${entry.name}/`);
    }
  }

  // Count loose files in root
  const rootFiles = fs.readdirSync(BASE_DIR, { withFileTypes: true })
    .filter(e => e.isFile() && e.name !== '.DS_Store');
  if (rootFiles.length > 0) {
    console.log(`\n📄 ${rootFiles.length} файлов в корне (не перемещены)`);
  }

  console.log('\nГотово!');
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
