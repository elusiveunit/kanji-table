import React from 'react';

import {
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
import { useStoreState } from '../state/store';
import { setOrdering } from '../state/actions/ordering';
import SortableTh from './SortableTh';
import MainTableBody from './MainTableBody';

export default function MainTable() {
  const [{ filtering, ordering }, d] = useStoreState(
    (state) => ({ filtering: state.filtering, ordering: state.ordering }),
    { setOrdering },
  );
  const thProps = { setOrdering: d.setOrdering, ...ordering };

  return (
    <div className="table-wrap">
      <table
        className="main-table"
        id="main-table"
        aria-describedby="main-table-description"
      >
        <colgroup>
          <col className="col-kanji" />
          <col span="2" className="col-order" />
          <col span="2" className="col-grade" />
          <col className="col-strokes" />
          <col span="5" className="col-frequency" />
        </colgroup>
        <thead>
          <tr>
            <th />
            <th scope="colgroup" colSpan="2">
              Order
            </th>
            <th scope="colgroup" colSpan="2">
              Grade
            </th>
            <th />
            <th scope="colgroup" colSpan="5">
              Frequency
            </th>
          </tr>
          <tr>
            <th scope="col">
              <span className="text">Kanji</span>
              <span className="ghost-icon" />
            </th>
            <SortableTh {...thProps} field={KKLC} text="KKLC" />
            <SortableTh {...thProps} field={RTK} text="RTK" />
            <SortableTh {...thProps} field={JLPT} text="JLPT" />
            <SortableTh {...thProps} field={JOYO} text="Jōyō" />
            <SortableTh {...thProps} field={STROKES} text="Strokes" />
            <SortableTh {...thProps} field={BUNKA} text="Bunka" />
            <SortableTh {...thProps} field={AOZORA} text="Aozora" />
            <SortableTh {...thProps} field={NEWS} text="News" />
            <SortableTh {...thProps} field={TWITTER} text="Twitter" />
            <SortableTh {...thProps} field={WIKIPEDIA} text="Wiki" />
          </tr>
        </thead>
        <MainTableBody {...ordering} filters={filtering.filters} />
      </table>
    </div>
  );
}
MainTable.displayName = 'MainTable';
