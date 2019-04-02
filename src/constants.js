// Data keys
const KANJI = 'k';
const KKLC = 'kl';
const RTK = 'rt';
const AOZORA = 'ao';
const NEWS = 'nw';
const TWITTER = 'tw';
const WIKIPEDIA = 'wk';
const BUNKA = 'bu';
const JLPT = 'jl';
const JOYO = 'jo';
const STROKES = 'st';

// CommonJS format for Node compatability since
// it's used in the JSON build script.
module.exports = {
  // Data keys
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

  // App
  ORDER_ASC: 'ASC',
  ORDER_DESC: 'DESC',
  ORDER_NONE: 'NONE',

  FREQUENCY_NAME: 'frequency',
  FREQUENCY_KEYS: [AOZORA, NEWS, TWITTER, WIKIPEDIA, BUNKA],
};
