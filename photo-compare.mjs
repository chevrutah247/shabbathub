#!/usr/bin/env node
/**
 * Photo Compare & Copy
 *
 * 1. Index all files in root (excluding Восстановлено1)
 * 2. Index all files in Восстановлено1
 * 3. Compare by filename + size
 * 4. Copy unique files from Восстановлено1 → root (Фото/YEAR/, Видео/YEAR/, Аудио/YEAR/)
 * 5. Rename Восстановлено1 → Дубликаты
 * 6. Verify 100% coverage
 */

import fs from 'fs';
import path from 'path';

const BASE_DIR = '/Volumes/home/MacBook/ 📸 SYNOLOGY ФОТОГРАФИИ';
const VOSST_DIR = path.join(BASE_DIR, 'Восстановлено1');
const SKIP_DIRS = new Set(['Восстановлено1', 'Дубликаты', 'Мусор', '.tmp.driveupload']);
const JUNK = new Set(['.DS_Store', 'Thumbs.db', '._.DS_Store']);

function* walkFiles(dir) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }

  for (const entry of entries) {
    if (JUNK.has(entry.name) || entry.name.startsWith('._')) continue;
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      yield* walkFiles(fullPath);
    } else if (entry.isFile()) {
      try {
        const stat = fs.statSync(fullPath);
        yield { path: fullPath, name: entry.name, size: stat.size };
      } catch {}
    }
  }
}

async function main() {
  console.log('🔍 Photo Compare & Copy\n');

  if (!fs.existsSync(BASE_DIR) || !fs.existsSync(VOSST_DIR)) {
    console.error('NAS или Восстановлено1 не доступны');
    process.exit(1);
  }

  // === Step 1: Index root files ===
  console.log('=== Шаг 1: Индексация файлов в корне ===\n');

  const rootIndex = new Map(); // key: "name|size" → count
  let rootCount = 0;

  const rootEntries = fs.readdirSync(BASE_DIR, { withFileTypes: true });
  for (const entry of rootEntries) {
    if (SKIP_DIRS.has(entry.name) || JUNK.has(entry.name) || entry.name.startsWith('._')) continue;

    const fullPath = path.join(BASE_DIR, entry.name);
    if (entry.isDirectory()) {
      for (const file of walkFiles(fullPath)) {
        const key = `${file.name}|${file.size}`;
        rootIndex.set(key, (rootIndex.get(key) || 0) + 1);
        rootCount++;
        if (rootCount % 5000 === 0) process.stdout.write(`\r  Корень: ${rootCount} файлов...`);
      }
    } else if (entry.isFile()) {
      try {
        const stat = fs.statSync(fullPath);
        const key = `${entry.name}|${stat.size}`;
        rootIndex.set(key, (rootIndex.get(key) || 0) + 1);
        rootCount++;
      } catch {}
    }
  }

  console.log(`\r  Корень: ${rootCount} файлов (${rootIndex.size} уникальных ключей)\n`);

  // === Step 2: Index Восстановлено1 files ===
  console.log('=== Шаг 2: Индексация файлов в Восстановлено1 ===\n');

  const vosstFiles = [];
  let vosstCount = 0;

  for (const file of walkFiles(VOSST_DIR)) {
    const key = `${file.name}|${file.size}`;
    const relPath = path.relative(VOSST_DIR, file.path);
    vosstFiles.push({ ...file, key, rel: relPath });
    vosstCount++;
    if (vosstCount % 5000 === 0) process.stdout.write(`\r  Восстановлено1: ${vosstCount} файлов...`);
  }

  console.log(`\r  Восстановлено1: ${vosstCount} файлов\n`);

  // === Step 3: Compare ===
  console.log('=== Шаг 3: Сравнение ===\n');

  const alreadyInRoot = [];
  const uniqueToVosst = [];

  for (const file of vosstFiles) {
    if (rootIndex.has(file.key)) {
      alreadyInRoot.push(file);
    } else {
      uniqueToVosst.push(file);
    }
  }

  console.log(`  Уже есть в корне: ${alreadyInRoot.length} файлов`);
  console.log(`  Уникальные (только в Восстановлено1): ${uniqueToVosst.length} файлов\n`);

  const pct = ((alreadyInRoot.length / vosstFiles.length) * 100).toFixed(1);
  console.log(`  Совпадение: ${pct}%\n`);

  // === Step 4: Copy unique files to root ===
  if (uniqueToVosst.length > 0) {
    console.log('=== Шаг 4: Копирование уникальных файлов в корень ===\n');

    let copied = 0, copyFailed = 0;
    const startTime = Date.now();

    for (const file of uniqueToVosst) {
      // Preserve structure: Фото/2020/file.jpg → root/Фото/2020/file.jpg
      const destPath = path.join(BASE_DIR, file.rel);
      const destDir = path.dirname(destPath);

      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }

      // Handle name collisions
      let finalDest = destPath;
      if (fs.existsSync(finalDest)) {
        const ext = path.extname(file.name);
        const base = path.basename(file.name, ext);
        let counter = 1;
        while (fs.existsSync(finalDest)) {
          finalDest = path.join(destDir, `${base}_${counter}${ext}`);
          counter++;
        }
      }

      try {
        fs.copyFileSync(file.path, finalDest);
        copied++;
      } catch (err) {
        copyFailed++;
      }

      const total = copied + copyFailed;
      if (total % 500 === 0) {
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(0);
        const pctDone = ((total / uniqueToVosst.length) * 100).toFixed(1);
        process.stdout.write(`\r  ${pctDone}% | Скопировано: ${copied} | Ошибки: ${copyFailed} | ${elapsed}с`);
      }
    }

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(0);
    console.log(`\r  Скопировано: ${copied} | Ошибки: ${copyFailed} | ${elapsed}с\n`);
  } else {
    console.log('=== Шаг 4: Копирование не нужно — всё уже в корне ===\n');
  }

  // === Step 5: Delete empty Дубликаты, rename Восстановлено1 → Дубликаты ===
  console.log('=== Шаг 5: Переименование Восстановлено1 → Дубликаты ===\n');

  const dupDir = path.join(BASE_DIR, 'Дубликаты');
  if (fs.existsSync(dupDir)) {
    try {
      // Delete if empty
      const dupContents = fs.readdirSync(dupDir).filter(f => !JUNK.has(f));
      if (dupContents.length === 0) {
        // Remove junk
        for (const f of fs.readdirSync(dupDir)) {
          try { fs.unlinkSync(path.join(dupDir, f)); } catch {}
        }
        fs.rmdirSync(dupDir);
        console.log('  Удалена пустая папка Дубликаты/');
      } else {
        console.log(`  ⚠️ Папка Дубликаты не пуста (${dupContents.length} элементов), пропускаю переименование`);
        console.log('');
        return;
      }
    } catch (err) {
      console.log(`  ⚠️ Не удалось удалить Дубликаты: ${err.message}`);
    }
  }

  try {
    fs.renameSync(VOSST_DIR, dupDir);
    console.log('  Восстановлено1 → Дубликаты ✓\n');
  } catch (err) {
    console.log(`  ❌ Ошибка переименования: ${err.message}\n`);
  }

  // === Step 6: Verify ===
  console.log('=== Шаг 6: Проверка 100% покрытия ===\n');

  const newDupDir = path.join(BASE_DIR, 'Дубликаты');
  if (!fs.existsSync(newDupDir)) {
    console.log('  Папка Дубликаты не найдена, проверка невозможна\n');
    return;
  }

  // Re-index root (now including copied files, excluding Дубликаты)
  console.log('  Индексация корня...');
  const finalRootIndex = new Map();
  let finalRootCount = 0;

  const finalEntries = fs.readdirSync(BASE_DIR, { withFileTypes: true });
  for (const entry of finalEntries) {
    if (entry.name === 'Дубликаты' || entry.name === 'Мусор' || entry.name === '.tmp.driveupload' ||
        JUNK.has(entry.name) || entry.name.startsWith('._')) continue;

    const fullPath = path.join(BASE_DIR, entry.name);
    if (entry.isDirectory()) {
      for (const file of walkFiles(fullPath)) {
        const key = `${file.name}|${file.size}`;
        finalRootIndex.set(key, (finalRootIndex.get(key) || 0) + 1);
        finalRootCount++;
        if (finalRootCount % 5000 === 0) process.stdout.write(`\r  Корень: ${finalRootCount}...`);
      }
    } else if (entry.isFile()) {
      try {
        const stat = fs.statSync(fullPath);
        finalRootIndex.set(`${entry.name}|${stat.size}`, 1);
        finalRootCount++;
      } catch {}
    }
  }

  console.log(`\r  Корень: ${finalRootCount} файлов`);

  // Check Дубликаты files against root
  console.log('  Проверка Дубликаты...');
  let verified = 0, missing = 0;
  const missingFiles = [];

  for (const file of walkFiles(newDupDir)) {
    const key = `${file.name}|${file.size}`;
    if (finalRootIndex.has(key)) {
      verified++;
    } else {
      missing++;
      if (missingFiles.length < 20) {
        missingFiles.push(path.relative(newDupDir, file.path));
      }
    }
    if ((verified + missing) % 5000 === 0) {
      process.stdout.write(`\r  Проверено: ${verified + missing}...`);
    }
  }

  const totalChecked = verified + missing;
  const verifiedPct = totalChecked > 0 ? ((verified / totalChecked) * 100).toFixed(2) : '0';

  console.log(`\r\n\n  ✅ Проверено: ${totalChecked} файлов`);
  console.log(`  ✅ Найдено в корне: ${verified} (${verifiedPct}%)`);
  console.log(`  ❌ Не найдено: ${missing}`);

  if (missingFiles.length > 0) {
    console.log('\n  Примеры отсутствующих:');
    for (const f of missingFiles) {
      console.log(`    ${f}`);
    }
  }

  if (missing === 0) {
    console.log('\n  🎉 100% файлов из Дубликаты подтверждены в корне!');
    console.log('  Папку Дубликаты можно безопасно удалить.');
  }

  // === Final structure ===
  console.log('\n=== Финальная структура ===\n');

  const topDirs = fs.readdirSync(BASE_DIR, { withFileTypes: true })
    .filter(e => e.isDirectory() && !JUNK.has(e.name) && !e.name.startsWith('.'))
    .sort((a, b) => a.name.localeCompare(b.name));

  for (const dir of topDirs) {
    const dirPath = path.join(BASE_DIR, dir.name);
    try {
      const subs = fs.readdirSync(dirPath).filter(f => !JUNK.has(f));
      console.log(`📁 ${dir.name}/ (${subs.length} элементов)`);
    } catch {
      console.log(`📁 ${dir.name}/`);
    }
  }

  const topFiles = fs.readdirSync(BASE_DIR, { withFileTypes: true })
    .filter(e => e.isFile() && !JUNK.has(e.name) && !e.name.startsWith('._'));
  if (topFiles.length > 0) {
    console.log(`📄 ${topFiles.length} файлов в корне`);
  }

  console.log('\nГотово!');
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
