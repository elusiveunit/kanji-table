import React from 'react';
import pt from 'prop-types';

import kanjiData from '../../../data/kanji.json';
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
  const { coreOrderBy, filters, orderBy, order } = props;
  const blank = <span aria-label="None">—</span>;
  const sorter = makeMultiSorter(
    { [orderBy]: order },
    coreOrderBy !== orderBy ? { [coreOrderBy]: ORDER_ASC } : null,
  );
  const resultData = filterKanjiData(kanjiData, filters).sort(sorter);
  const hasResults = Boolean(resultData.length);

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
              {d[KANJI]}
            </th>
            <td>{d[KKLC] || blank}</td>
            <td>{d[RTK] || blank}</td>
            <td>{d[JLPT] || blank}</td>
            <td>{d[JOYO] || blank}</td>
            <td>{d[STROKES] || blank}</td>
            <td>{d[BUNKA] || blank}</td>
            <td>{d[AOZORA] || blank}</td>
            <td>{d[NEWS] || blank}</td>
            <td>{d[TWITTER] || blank}</td>
            <td>{d[WIKIPEDIA] || blank}</td>
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
  order: pt.string.isRequired,
  orderBy: pt.string.isRequired,
};

function propsAreEqual(prevProps, nextProps) {
  return (
    prevProps.order === nextProps.order &&
    prevProps.orderBy === nextProps.orderBy &&
    prevProps.filters === nextProps.filters
  );
}
export default React.memo(MainTableBody, propsAreEqual);
