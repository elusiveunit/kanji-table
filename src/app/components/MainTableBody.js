import React from 'react';
import pt from 'prop-types';

import kanjiData from '../../../data/kanji-compressed.json';
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
  ORDER_ASC,
} from '../../constants';
import { filterKanjiData, makeMultiSorter } from '../utils';

function MainTableBody(props) {
  const { coreOrderBy, filters, hiddenColumns, orderBy, order } = props;
  const sorter = makeMultiSorter(
    { [orderBy]: order },
    coreOrderBy !== orderBy ? { [coreOrderBy]: ORDER_ASC } : null,
  );
  const resultData = filterKanjiData(kanjiData, filters).sort(sorter);
  const hasResults = Boolean(resultData.length);
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
        resultData.map((d) => (
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
MainTableBody.displayName = 'MainTableBody';
MainTableBody.propTypes = {
  coreOrderBy: pt.string.isRequired,
  filters: pt.arrayOf(
    pt.shape({ key: pt.string, value: pt.oneOfType([pt.string, pt.number]) }),
  ).isRequired,
  hiddenColumns: pt.arrayOf(pt.string).isRequired,
  order: pt.string.isRequired,
  orderBy: pt.string.isRequired,
};

function propsAreEqual(prevProps, nextProps) {
  return (
    prevProps.order === nextProps.order &&
    prevProps.orderBy === nextProps.orderBy &&
    prevProps.filters === nextProps.filters &&
    prevProps.hiddenColumns === nextProps.hiddenColumns
  );
}
export default React.memo(MainTableBody, propsAreEqual);
