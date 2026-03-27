#!/usr/bin/env node
/**
 * Photo Cleanup - наведение порядка в 📸 SYNOLOGY ФОТОГРАФИИ
 *
 * 1. Папки с одинаковыми именами → объединить (не считая годов)
 * 2. Остальное → Дубликаты/
 * 3. EPERM → Мусор/
 * 4. Удалить пустые папки
 */

import fs from 'fs';
import path from 'path';

const BASE_DIR = '/Volumes/home/MacBook/ 📸 SYNOLOGY ФОТОГРАФИИ';
const KEEP_FOLDERS = new Set(['Восстановлено1', 'Дубликаты', 'Мусор', '.tmp.driveupload']);
const JUNK_FILES = new Set(['.DS_Store', 'Thumbs.db', '._.DS_Store']);

function safeMove(src, destDir, name) {
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

  let finalDest = path.join(destDir, name);

  // Handle name collisions
  if (fs.existsSync(finalDest)) {
    const ext = path.extname(name);
    const base = path.basename(name, ext);
    let counter = 1;
    while (fs.existsSync(finalDest)) {
      finalDest = path.join(destDir, `${base}_${counter}${ext}`);
      counter++;
    }
  }

  try {
    fs.renameSync(src, finalDest);
    return { ok: true, dest: finalDest };
  } catch (err) {
    if (err.code === 'EPERM' || err.code === 'EACCES') {
      return { ok: false, error: 'EPERM', src };
    }
    // Try copy for cross-device
    try {
      if (fs.statSync(src).isFile()) {
        fs.copyFileSync(src, finalDest);
        fs.unlinkSync(src);
        return { ok: true, dest: finalDest };
      }
    } catch {}
    return { ok: false, error: err.code || 'UNKNOWN', src };
  }
}

function mergeFolder(srcFolder, destFolder) {
  // Move all contents of srcFolder into destFolder
  if (!fs.existsSync(destFolder)) fs.mkdirSync(destFolder, { recursive: true });

  let moved = 0, failed = 0;
  let entries;
  try {
    entries = fs.readdirSync(srcFolder, { withFileTypes: true });
  } catch { return { moved: 0, failed: 0 }; }

  for (const entry of entries) {
    if (JUNK_FILES.has(entry.name)) continue;
    const srcPath = path.join(srcFolder, entry.name);
    const result = safeMove(srcPath, destFolder, entry.name);
    if (result.ok) moved++;
    else failed++;
  }
  return { moved, failed };
}

function removeEmptyDirs(dir, isRoot = false) {
  if (!fs.existsSync(dir)) return;
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }

  for (const entry of entries) {
    if (entry.isDirectory()) {
      removeEmptyDirs(path.join(dir, entry.name));
    }
  }

  // Re-check
  entries = fs.readdirSync(dir);
  const real = entries.filter(e => !JUNK_FILES.has(e));

  if (real.length === 0 && !isRoot) {
    // Delete junk first
    for (const j of entries) {
      try { fs.unlinkSync(path.join(dir, j)); } catch {}
    }
    try { fs.rmdirSync(dir); console.log(`  Удалена: ${path.relative(BASE_DIR, dir)}/`); } catch {}
  }
}

async function main() {
  console.log('🧹 Photo Cleanup\n');

  if (!fs.existsSync(BASE_DIR)) {
    console.error('NAS не доступен:', BASE_DIR);
    process.exit(1);
  }

  const dupDir = path.join(BASE_DIR, 'Дубликаты');
  const trashDir = path.join(BASE_DIR, 'Мусор');
  if (!fs.existsSync(dupDir)) fs.mkdirSync(dupDir);
  if (!fs.existsSync(trashDir)) fs.mkdirSync(trashDir);

  // === Step 1: Find and merge folders with same names ===
  console.log('=== Шаг 1: Поиск папок с одинаковыми именами ===\n');

  const allEntries = fs.readdirSync(BASE_DIR, { withFileTypes: true });
  const folders = allEntries
    .filter(e => e.isDirectory() && !JUNK_FILES.has(e.name) && !KEEP_FOLDERS.has(e.name))
    .map(e => e.name);

  // Group by normalized name (lowercase, trimmed)
  const nameGroups = {};
  for (const f of folders) {
    const key = f.trim().toLowerCase();
    if (!nameGroups[key]) nameGroups[key] = [];
    nameGroups[key].push(f);
  }

  let mergedCount = 0;
  for (const [key, names] of Object.entries(nameGroups)) {
    // Skip year-only folders
    if (/^(19|20)\d{2}$/.test(key)) continue;

    if (names.length > 1) {
      console.log(`  Объединяю: ${names.join(' + ')}`);
      // Keep the first, merge rest into it
      const target = path.join(BASE_DIR, names[0]);
      for (let i = 1; i < names.length; i++) {
        const src = path.join(BASE_DIR, names[i]);
        const result = mergeFolder(src, target);
        console.log(`    ${names[i]} → ${names[0]}: ${result.moved} файлов, ${result.failed} ошибок`);
        mergedCount += result.moved;
      }
    }
  }

  if (mergedCount === 0) {
    console.log('  Дубликатов папок не найдено\n');
  } else {
    console.log(`\n  Объединено: ${mergedCount} файлов\n`);
  }

  // === Step 2: Move all non-essential folders to Дубликаты ===
  console.log('=== Шаг 2: Перемещение папок в Дубликаты/ ===\n');

  let movedFolders = 0, failedFolders = 0;
  const epermItems = [];

  // Re-read after merges
  const currentFolders = fs.readdirSync(BASE_DIR, { withFileTypes: true })
    .filter(e => e.isDirectory() && !JUNK_FILES.has(e.name) && !KEEP_FOLDERS.has(e.name));

  for (const entry of currentFolders) {
    const srcPath = path.join(BASE_DIR, entry.name);
    const result = safeMove(srcPath, dupDir, entry.name);
    if (result.ok) {
      movedFolders++;
      if (movedFolders % 10 === 0) process.stdout.write(`\r  Перемещено папок: ${movedFolders}`);
    } else {
      // Try moving to Мусор
      const trashResult = safeMove(srcPath, trashDir, entry.name);
      if (trashResult.ok) {
        epermItems.push(entry.name);
      } else {
        failedFolders++;
        console.log(`  ❌ Не удалось: ${entry.name} (${result.error})`);
      }
    }
  }

  console.log(`\r  Папок в Дубликаты: ${movedFolders}`);
  if (epermItems.length > 0) console.log(`  Папок в Мусор (EPERM): ${epermItems.length}`);
  if (failedFolders > 0) console.log(`  Ошибок: ${failedFolders}`);
  console.log('');

  // === Step 3: Move loose files from root to Дубликаты ===
  console.log('=== Шаг 3: Перемещение файлов из корня в Дубликаты/ ===\n');

  const rootFiles = fs.readdirSync(BASE_DIR, { withFileTypes: true })
    .filter(e => e.isFile() && !JUNK_FILES.has(e.name) && !e.name.startsWith('._'));

  let movedFiles = 0, failedFiles = 0;

  for (const entry of rootFiles) {
    const srcPath = path.join(BASE_DIR, entry.name);
    const result = safeMove(srcPath, dupDir, entry.name);
    if (result.ok) {
      movedFiles++;
      if (movedFiles % 100 === 0) process.stdout.write(`\r  Перемещено файлов: ${movedFiles}`);
    } else {
      const trashResult = safeMove(srcPath, trashDir, entry.name);
      if (trashResult.ok) {
        epermItems.push(entry.name);
      } else {
        failedFiles++;
      }
    }
  }

  console.log(`\r  Файлов в Дубликаты: ${movedFiles}`);
  if (failedFiles > 0) console.log(`  Ошибок: ${failedFiles}`);
  console.log('');

  // === Step 4: Clean EPERM items inside Восстановлено1 ===
  console.log('=== Шаг 4: Перемещение EPERM из Восстановлено1 в Мусор ===\n');

  const vosst = path.join(BASE_DIR, 'Восстановлено1');
  if (fs.existsSync(vosst)) {
    const vosstEntries = fs.readdirSync(vosst, { withFileTypes: true })
      .filter(e => !JUNK_FILES.has(e.name));

    const keepInVosst = new Set(['Фото', 'Видео', 'Аудио', 'МУСОР']);
    let movedEperm = 0;

    for (const entry of vosstEntries) {
      if (keepInVosst.has(entry.name)) continue;

      const srcPath = path.join(vosst, entry.name);
      const result = safeMove(srcPath, trashDir, entry.name);
      if (result.ok) {
        movedEperm++;
        console.log(`  → Мусор: ${entry.name}`);
      } else {
        console.log(`  ❌ Не удалось: ${entry.name}`);
      }
    }

    // Also move МУСОР contents from Восстановлено1 to root Мусор
    const vosstTrash = path.join(vosst, 'МУСОР');
    if (fs.existsSync(vosstTrash)) {
      const trashItems = fs.readdirSync(vosstTrash, { withFileTypes: true })
        .filter(e => !JUNK_FILES.has(e.name));

      for (const item of trashItems) {
        const srcPath = path.join(vosstTrash, item.name);
        const result = safeMove(srcPath, trashDir, item.name);
        if (result.ok) {
          movedEperm++;
          console.log(`  → Мусор (из Восстановлено1): ${item.name}`);
        }
      }
    }

    // Move loose files from Восстановлено1 root
    const vosstFiles = fs.readdirSync(vosst, { withFileTypes: true })
      .filter(e => e.isFile() && !JUNK_FILES.has(e.name));

    for (const f of vosstFiles) {
      const srcPath = path.join(vosst, f.name);
      const result = safeMove(srcPath, trashDir, f.name);
      if (result.ok) {
        movedEperm++;
        console.log(`  → Мусор (файл): ${f.name}`);
      }
    }

    console.log(`  Перемещено в Мусор: ${movedEperm}`);
  }
  console.log('');

  // === Step 5: Remove empty folders ===
  console.log('=== Шаг 5: Удаление пустых папок ===\n');

  removeEmptyDirs(BASE_DIR, true);
  removeEmptyDirs(vosst, true);
  removeEmptyDirs(dupDir, true);

  console.log('');

  // === Final structure ===
  console.log('=== Финальная структура ===\n');

  const finalEntries = fs.readdirSync(BASE_DIR, { withFileTypes: true })
    .filter(e => !JUNK_FILES.has(e.name) && !e.name.startsWith('._'))
    .sort((a, b) => a.name.localeCompare(b.name));

  for (const entry of finalEntries) {
    if (entry.isDirectory()) {
      const entryPath = path.join(BASE_DIR, entry.name);
      try {
        const subs = fs.readdirSync(entryPath, { withFileTypes: true })
          .filter(e => !JUNK_FILES.has(e.name));

        if (entry.name === 'Восстановлено1') {
          console.log(`📁 ${entry.name}/`);
          for (const sub of subs.filter(s => s.isDirectory()).sort((a,b) => a.name.localeCompare(b.name))) {
            const subPath = path.join(entryPath, sub.name);
            try {
              const yearDirs = fs.readdirSync(subPath, { withFileTypes: true })
                .filter(e => e.isDirectory() && !JUNK_FILES.has(e.name));
              console.log(`   📁 ${sub.name}/ (${yearDirs.length} годов)`);
            } catch {
              console.log(`   📁 ${sub.name}/`);
            }
          }
        } else if (entry.name === 'Дубликаты' || entry.name === 'Мусор') {
          const count = subs.length;
          console.log(`📁 ${entry.name}/ (${count} элементов)`);
        } else {
          console.log(`📁 ${entry.name}/ (${subs.length} элементов)`);
        }
      } catch {
        console.log(`📁 ${entry.name}/`);
      }
    } else {
      console.log(`📄 ${entry.name}`);
    }
  }

  console.log('\nГотово!');
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
