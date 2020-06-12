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

const ROWS = 'g';

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

  ROWS,

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

  ROWS_LABEL: 'Range',

  ORDER: 'order',
  ORDER_KEYS: [KKLC, RTK],
  ORDER_LABEL: 'Order',
  GRADE: 'grade',
  GRADE_KEYS: [JLPT, JOYO],
  GRADE_LABEL: 'Grade',
  FREQUENCY: 'frequency',
  FREQUENCY_KEYS: [BUNKA, AOZORA, NEWS, TWITTER, WIKIPEDIA],
  FREQUENCY_LABEL: 'Frequency',

  ALL_LABEL: 'All',
  ALL_VALUE: 'all',

  ORDER_ASC: 'ASC',
  ORDER_DESC: 'DESC',
  ORDER_NONE: 'NONE',

  MAX_SUFFIX: '-max',
  MIN_SUFFIX: '-min',

  CHILDREN_KEY: 'children',
};
