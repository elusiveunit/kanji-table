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
  JLPT,
  JOYO,
  STROKES,
  BUNKA,
  AOZORA,
  NEWS,
  TWITTER,
  WIKIPEDIA,

  // ----- App -----
  KANJI_LABEL: 'Kanji',
  KKLC_LABEL: 'KKLC',
  RTK_LABEL: 'RTK',
  JLPT_LABEL: 'JLPT',
  JOYO_LABEL: 'Jōyō',
  STROKES_LABEL: 'Strokes',
  BUNKA_LABEL: 'Bunka',
  AOZORA_LABEL: 'Aozora',
  NEWS_LABEL: 'News',
  TWITTER_LABEL: 'Twitter',
  WIKIPEDIA_LABEL: 'Wiki',

  ORDER: 'order',
  ORDER_KEYS: [KKLC, RTK],
  ORDER_LABEL: 'Order',
  GRADE: 'grade',
  GRADE_KEYS: [JLPT, JOYO],
  GRADE_LABEL: 'Grade',
  FREQUENCY: 'frequency',
  FREQUENCY_KEYS: [BUNKA, AOZORA, NEWS, TWITTER, WIKIPEDIA],
  FREQUENCY_LABEL: 'Frequency',

  ORDER_ASC: 'ASC',
  ORDER_DESC: 'DESC',
  ORDER_NONE: 'NONE',

  MAX_SUFFIX: '-max',
  MIN_SUFFIX: '-min',

  CHILDREN_KEY: 'children',
};
