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
} from '../../constants';
import { makeMultiSorter } from '../utils';

function MainTableBody(props) {
  const { coreOrderBy, orderBy, order } = props;
  const blank = <span aria-label="None">—</span>;
  const sorter = makeMultiSorter(order, orderBy, coreOrderBy);
  const sortedData = kanjiData.slice().sort(sorter);

  return (
    <tbody>
      {sortedData.map((d) => (
        <tr key={d[KANJI]}>
          <th scope="row" lang="ja">
            {d[KANJI]}
          </th>
          <td>{d[KKLC] || blank}</td>
          <td>{d[RTK] || blank}</td>
          <td>{d[BUNKA] || blank}</td>
          <td>{d[AOZORA] || blank}</td>
          <td>{d[NEWS] || blank}</td>
          <td>{d[TWITTER] || blank}</td>
          <td>{d[WIKIPEDIA] || blank}</td>
          <td>{d[JLPT] || blank}</td>
          <td>{d[JOYO] || blank}</td>
          <td>{d[STROKES] || blank}</td>
        </tr>
      ))}
    </tbody>
  );
}
MainTableBody.displayName = 'MainTableBody';
MainTableBody.propTypes = {
  coreOrderBy: pt.string.isRequired,
  order: pt.string.isRequired,
  orderBy: pt.string.isRequired,
};

function propsAreEqual(prevProps, nextProps) {
  return (
    prevProps.order === nextProps.order &&
    prevProps.orderBy === nextProps.orderBy
  );
}
export default React.memo(MainTableBody, propsAreEqual);
