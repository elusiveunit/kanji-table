import React from 'react';
import pt from 'prop-types';

import {
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
} from '../../constants';

function MainTableBody({ hiddenColumns, kanjiData }) {
  const hasResults = Boolean(kanjiData.length);
  const isVisible = (name) => !hiddenColumns.includes(name);
  const blank = <span aria-label="None">—</span>;

  return (
    <tbody>
      {!hasResults && (
        <tr>
          <td className="no-results" colSpan="11">
            No results
          </td>
        </tr>
      )}
      {hasResults &&
        kanjiData.map((d) => (
          <tr key={d[KANJI]}>
            <th scope="row" lang="ja">
              <a
                href={`https://jisho.org/search/${encodeURIComponent(
                  d[KANJI],
                )}%23kanji`}
              >
                {d[KANJI]}
              </a>
            </th>
            {isVisible(KKLC) && <td>{d[KKLC] || blank}</td>}
            {isVisible(RTK) && <td>{d[RTK] || blank}</td>}
            {isVisible(JLPT) && <td>{d[JLPT] || blank}</td>}
            {isVisible(JOYO) && <td>{d[JOYO] || blank}</td>}
            {isVisible(STROKES) && <td>{d[STROKES] || blank}</td>}
            {isVisible(BUNKA) && <td>{d[BUNKA] || blank}</td>}
            {isVisible(AOZORA) && <td>{d[AOZORA] || blank}</td>}
            {isVisible(NEWS) && <td>{d[NEWS] || blank}</td>}
            {isVisible(TWITTER) && <td>{d[TWITTER] || blank}</td>}
            {isVisible(WIKIPEDIA) && <td>{d[WIKIPEDIA] || blank}</td>}
          </tr>
        ))}
    </tbody>
  );
}
MainTableBody.propTypes = {
  hiddenColumns: pt.arrayOf(pt.string).isRequired,
  kanjiData: pt.arrayOf(pt.object).isRequired,
};

function propsAreEqual(prevProps, nextProps) {
  return (
    prevProps.hiddenColumns === nextProps.hiddenColumns &&
    prevProps.kanjiData === nextProps.kanjiData
  );
}
export default React.memo(MainTableBody, propsAreEqual);
