// Data keys for compressed version
const KANJI = 'k';
const KKLC = 'l';
const RTK = 'r';
const JLPT = 'j';
const JOYO = 'o';
const STROKES = 's';
const BUNKA = 'b';
const AOZORA = 'a';
const NEWS = 'n';
const TWITTER = 't';
const WIKIPEDIA = 'w';

// CommonJS format for Node compatability since
// it's used in the JSON build script.
module.exports = {
  // ----- Data keys -----
  KANJI,
  KKLC,
  RTK,
  AOZORA,
  NEWS,
  TWITTER,
  WIKIPEDIA,
  BUNKA,
  JLPT,
  JOYO,
  STROKES,

  // ----- App -----
  ORDER_ASC: 'ASC',
  ORDER_DESC: 'DESC',
  ORDER_NONE: 'NONE',
  MAX_SUFFIX: '-max',
  MIN_SUFFIX: '-min',
  FREQUENCY_NAME: 'frequency',
  FREQUENCY_KEYS: [AOZORA, NEWS, TWITTER, WIKIPEDIA, BUNKA],
};
