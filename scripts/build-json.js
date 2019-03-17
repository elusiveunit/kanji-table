/* eslint-disable no-console */

// TODO: Build from the Aozora frequency list (or another) instead for more
// kanji? Probably not that useful for most people.

const path = require('path');
const fs = require('fs-extra');
const mapValues = require('lodash/mapValues');
const forEach = require('lodash/forEach');

const constants = require('../src/constants');

/* -------------------- Config -------------------- */
const KKLC_ORDER_PATH = '../data/kklc-order.txt';
const RTK_ORDER_PATH = '../data/rtk-order.txt';
const BUNKA_FREQUENCY_PATH = '../data/bunka.csv';
const KANJI_FREQUENCY_PATHS = {
  [constants.AOZORA]: '../data/kanji-frequency-aozora.json',
  [constants.NEWS]: '../data/kanji-frequency-news.json',
  [constants.TWITTER]: '../data/kanji-frequency-twitter.json',
  [constants.WIKIPEDIA]: '../data/kanji-frequency-wikipedia.json',
};
const GRADE_PATHS = {
  [constants.JLPT]: '../data/jlpt-level.json',
  [constants.JOYO]: '../data/joyo-grade.json',
};
const VARIANTS_PATH = '../data/variants.json';
const OUTPUT_PATH = '../data/kanji.json';

/* -------------------- Utils -------------------- */
function assign(...obj) {
  return Object.assign({}, ...obj);
}

function assignIfNull(...obj) {
  const result = obj[0];
  let next = obj[1];
  let i = 2;
  while (next) {
    Object.entries(next).forEach(([key, val]) => {
      if (result[key] === null) {
        result[key] = val;
      }
    });
    next = obj[i];
    i += 1;
  }
  return result;
}

function filterKeys(obj, keys) {
  return Object.keys(obj)
    .filter((key) => keys.includes(key))
    .reduce((result, key) => {
      // eslint-disable-next-line no-param-reassign
      result[key] = obj[key];
      return result;
    }, {});
}

function readFile(filePath) {
  return fs.readFileSync(path.resolve(__dirname, filePath), {
    encoding: 'utf-8',
  });
}

function readJSON(filePath) {
  return JSON.parse(readFile(filePath));
}

function parseTxtOrder(filePath) {
  return readFile(filePath)
    .split(/\s/)
    .map((str) => str.trim());
}

function parseGrade(filePath) {
  return mapValues(readJSON(filePath), (str) => str.split(' '));
}

function parseKanjiFrequency(filePath, kanjiWhitelist) {
  let latestFreq = null;
  let latestRank = 1;

  return readJSON(filePath)
    .filter((item) => kanjiWhitelist.includes(item[0]))
    .reduce((result, item) => {
      /* eslint-disable no-param-reassign */
      const rank = latestRank;
      if (latestFreq !== item[1]) {
        latestRank += 1;
      }
      latestFreq = item[1];
      result[item[0]] = rank;
      return result;
    }, {});
}

/* -------------------- Build kanji selection -------------------- */
console.log('Building kanji list...');
const kklc = parseTxtOrder(KKLC_ORDER_PATH);
const rtk = parseTxtOrder(RTK_ORDER_PATH);

// Start from KKLC since it has more characters
const kanji = kklc.map((kklcChar, i) => {
  const rtkIndex = rtk.findIndex((rtkChar) => rtkChar === kklcChar);

  return {
    [constants.KANJI]: kklcChar,
    [constants.KKLC]: i + 1,
    [constants.RTK]: rtkIndex === -1 ? null : rtkIndex + 1,
  };
});

// Add RTK characters that aren't in KLC
rtk.forEach((rtkChar, i) => {
  if (!kanji.find((obj) => obj[constants.KANJI] === rtkChar)) {
    kanji.push({
      [constants.KANJI]: rtkChar,
      [constants.KKLC]: null,
      [constants.RTK]: i + 1,
    });
  }
});

const kanjiCharacters = kanji.map((data) => data[constants.KANJI]);

/* -------------------- Add frequency data -------------------- */
console.log('Parsing frequency data...');
// Agency for Cultural Affairs
const freqBunka = readFile(BUNKA_FREQUENCY_PATH)
  .split(/[\r\n]+/)
  .map((row) => {
    const r = row.replace(/\s/, '').split(',');
    return { [constants.KANJI]: r[1], freq: parseInt(r[0], 10) };
  });
// kanji-frequency
const freqKanjiFrequency = mapValues(KANJI_FREQUENCY_PATHS, (p) =>
  parseKanjiFrequency(p, kanjiCharacters),
);

console.log('Adding frequency data...');
const kanjiWithFrequency = kanji.map((obj) => {
  const fBunka = freqBunka.find(
    (f) => f[constants.KANJI] === obj[constants.KANJI],
  );
  const fKanji = mapValues(
    freqKanjiFrequency,
    (f) => f[obj[constants.KANJI]] || null,
  );

  return assign(obj, fKanji, {
    [constants.BUNKA]: fBunka ? fBunka.freq : null,
  });
});

/* -------------------- Add grades data -------------------- */
console.log('Adding grade data...');
const gradeJSON = mapValues(GRADE_PATHS, parseGrade);
const kanjiWithGrades = kanjiWithFrequency.map((obj) => {
  const kanjiGrade = {};
  forEach(gradeJSON, (gradeData, key) => {
    forEach(gradeData, (kanjiList, grade) => {
      if (kanjiList.includes(obj[constants.KANJI])) {
        // Use numbers where possible (grade 1, 2...), fall back to the raw
        // text ('s', 'n5'...)
        kanjiGrade[key] = parseInt(grade, 10) || grade.toUpperCase();
      }
    });
  });
  const gradeOutput = mapValues(gradeJSON, (_, key) => kanjiGrade[key] || null);
  return assign(obj, gradeOutput);
});

/* -------------------- Copy between variants -------------------- */
console.log('Copying between variants...');
const variantJSON = readJSON(VARIANTS_PATH);
const output = kanjiWithGrades.map((obj) => {
  const found = variantJSON.find((chars) =>
    chars.includes(obj[constants.KANJI]),
  );
  const variant = found
    ? found.filter((char) => char !== obj[constants.KANJI])[0]
    : null;
  if (!variant) {
    return obj;
  }
  const variantData = kanjiWithGrades.find(
    (o) => o[constants.KANJI] === variant,
  );
  // Don't include any frequency data since that could be misleading
  return assignIfNull(
    obj,
    filterKeys(variantData || {}, [
      constants.KKLC,
      constants.RTK,
      constants.JLPT,
      constants.JOYO,
    ]),
  );
});

/* -------------------- Write to file -------------------- */
console.log('Writing file...');
fs.writeFileSync(
  path.resolve(__dirname, OUTPUT_PATH),
  JSON.stringify(output, null, 2),
);

console.log('Done!');
