#!/usr/bin/env node
/**
 * Copy external disk izrailtaynin → NAS 📸 SYNOLOGY ФОТОГРАФИИ/izrailtaynin/
 */

import fs from 'fs';
import path from 'path';

const SRC_DIR = '/Volumes/izrailtaynin';
const DEST_DIR = '/Volumes/home/MacBook/ 📸 SYNOLOGY ФОТОГРАФИИ/izrailtaynin';
const SKIP = new Set(['$RECYCLE.BIN', 'System Volume Information', '.Spotlight-V100', '.fseventsd', '.TemporaryItems', '.Trashes']);
const JUNK = new Set(['.DS_Store', 'Thumbs.db', 'desktop.ini']);

let copied = 0, skipped = 0, errors = 0;
const errorFiles = [];
const startTime = Date.now();

function copyRecursive(src, dest) {
  let entries;
  try { entries = fs.readdirSync(src, { withFileTypes: true }); } catch (err) {
    errors++;
    errorFiles.push(`DIR READ: ${src} - ${err.code}`);
    return;
  }

  for (const entry of entries) {
    if (SKIP.has(entry.name) || JUNK.has(entry.name) || entry.name.startsWith('._')) continue;

    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      if (!fs.existsSync(destPath)) fs.mkdirSync(destPath, { recursive: true });
      copyRecursive(srcPath, destPath);
    } else if (entry.isFile()) {
      // Skip if already exists with same size
      if (fs.existsSync(destPath)) {
        try {
          const srcStat = fs.statSync(srcPath);
          const destStat = fs.statSync(destPath);
          if (srcStat.size === destStat.size) {
            skipped++;
            const total = copied + skipped + errors;
            if (total % 2000 === 0) {
              const elapsed = ((Date.now() - startTime) / 1000).toFixed(0);
              process.stdout.write(`\r  Скопировано: ${copied} | Пропущено: ${skipped} | Ошибки: ${errors} | ${elapsed}с`);
            }
            continue;
          }
        } catch {}
      }

      try {
        const destDir = path.dirname(destPath);
        if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
        fs.copyFileSync(srcPath, destPath);
        copied++;
      } catch (err) {
        errors++;
        if (errorFiles.length < 50) {
          errorFiles.push(`${path.relative(SRC_DIR, srcPath)} - ${err.code || err.message}`);
        }
      }

      const total = copied + skipped + errors;
      if (total % 500 === 0) {
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(0);
        const pct = ((total / 213657) * 100).toFixed(1);
        process.stdout.write(`\r  ${pct}% | Скопировано: ${copied} | Пропущено: ${skipped} | Ошибки: ${errors} | ${elapsed}с`);
      }
    }
  }
}

console.log('📀 Копирование izrailtaynin → NAS\n');

if (!fs.existsSync(SRC_DIR)) {
  console.error('Диск не подключён:', SRC_DIR);
  process.exit(1);
}

if (!fs.existsSync(path.dirname(DEST_DIR))) {
  console.error('NAS не доступен');
  process.exit(1);
}

if (!fs.existsSync(DEST_DIR)) fs.mkdirSync(DEST_DIR, { recursive: true });

console.log(`Источник: ${SRC_DIR}`);
console.log(`Назначение: ${DEST_DIR}\n`);

// Copy ФОТОГРАФИИ
console.log('=== Копирование ФОТОГРАФИИ (~213,470 файлов) ===\n');
copyRecursive(path.join(SRC_DIR, 'ФОТОГРАФИИ'), path.join(DEST_DIR, 'ФОТОГРАФИИ'));

console.log('');

// Copy видео Днепр
console.log('\n=== Копирование видео Днепр (~187 файлов) ===\n');
copyRecursive(path.join(SRC_DIR, 'видео Днепр'), path.join(DEST_DIR, 'видео Днепр'));

const elapsed = ((Date.now() - startTime) / 1000 / 60).toFixed(1);
console.log(`\n\n=== Итого ===`);
console.log(`  Скопировано: ${copied}`);
console.log(`  Пропущено (уже есть): ${skipped}`);
console.log(`  Ошибок: ${errors}`);
console.log(`  Время: ${elapsed} мин`);

if (errorFiles.length > 0) {
  console.log(`\n=== Файлы с ошибками ===`);
  for (const f of errorFiles) {
    console.log(`  ${f}`);
  }
}

console.log('\nГотово!');
