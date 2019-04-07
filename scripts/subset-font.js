/* eslint-disable no-console */

const childProcess = require('child_process');
const path = require('path');

const fs = require('fs-extra');
const CharacterSet = require('characterset');
const constants = require('../src/constants');

/* -------------------- Config -------------------- */
const FONT_PATH = path.resolve(__dirname, '../src/fonts/SourceHanSerifJP/');
const FONT_INPUT_FILE_PATH = path.resolve(
  FONT_PATH,
  'SourceHanSerifJP-Regular.otf',
);
const FONT_OUTPUT_FILE_PATH = path.resolve(
  FONT_PATH,
  'SourceHanSerifJP-Regular-subset.otf',
);
const TEMP_PATH = path.resolve(__dirname, '../temp');
const UNICODE_RANGE_FILE_PATH = path.resolve(TEMP_PATH, './kanji-unicode.txt');
const FONT_FORMATS = ['woff2', 'woff'];

/* -------------------- Unicode range -------------------- */
// Create a whitelist for pyftsubset with characters that should be included
// in the generated font file(s).
console.log('Creating kanji unicode range...');
fs.ensureDirSync(TEMP_PATH);
const kanji = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../data/kanji-compressed.json'), {
    encoding: 'utf-8',
  }),
);
const kanjiChars = kanji.reduce((acc, item) => acc + item[constants.KANJI], '');
const charSet = new CharacterSet(kanjiChars);

// Save to a temp file, the command will be too long if trying to pass all
// the characters via a CLI flag.
fs.writeFileSync(UNICODE_RANGE_FILE_PATH, charSet.toHexRangeString());

/* -------------------- Create fonts -------------------- */
FONT_FORMATS.forEach((format) => {
  console.log(`Creating ${format} subset font...`);
  const outputFile = FONT_OUTPUT_FILE_PATH.replace(/\.otf$/, `.${format}`);
  const flavor = format !== 'otf' ? ` --flavor="${format}"` : '';
  childProcess.execSync(
    `pyftsubset "${FONT_INPUT_FILE_PATH}" --unicodes-file="${UNICODE_RANGE_FILE_PATH}"${flavor} --output-file="${outputFile}"`,
  );
});

console.log('Cleaning up...');
fs.removeSync(TEMP_PATH);

console.log('Done!');
