import React from 'react';

import {
  AOZORA_LABEL,
  AOZORA,
  BUNKA_LABEL,
  BUNKA,
  FREQUENCY_KEYS,
  FREQUENCY_LABEL,
  GRADE_KEYS,
  GRADE_LABEL,
  JLPT_LABEL,
  JLPT,
  JOYO_LABEL,
  JOYO,
  KKLC_LABEL,
  KKLC,
  NEWS_LABEL,
  NEWS,
  ORDER_KEYS,
  ORDER_LABEL,
  RTK_LABEL,
  RTK,
  STROKES_LABEL,
  STROKES,
  TWITTER_LABEL,
  TWITTER,
  WIKIPEDIA_LABEL,
  WIKIPEDIA,
} from '../../constants';
import { useStoreState } from '../state/store';
import { setOrdering } from '../state/actions/ordering';
import SortableTh from './SortableTh';
import MainTableBody from './MainTableBody';

function mapState(state) {
  return {
    filters: state.filtering.filters,
    hiddenColumns: state.ui.hiddenColumns,
    ordering: state.ordering,
  };
}
const mapDispatch = {
  setOrdering,
};

export default function MainTable() {
  const [{ filters, hiddenColumns, ordering }, d] = useStoreState(
    mapState,
    mapDispatch,
  );
  const thItems = [
    [KKLC, KKLC_LABEL],
    [RTK, RTK_LABEL],
    [JLPT, JLPT_LABEL],
    [JOYO, JOYO_LABEL],
    [STROKES, STROKES_LABEL],
    [BUNKA, BUNKA_LABEL],
    [AOZORA, AOZORA_LABEL],
    [NEWS, NEWS_LABEL],
    [TWITTER, TWITTER_LABEL],
    [WIKIPEDIA, WIKIPEDIA_LABEL],
  ];
  const thProps = { setOrdering: d.setOrdering, ...ordering };
  const isVisible = (name) => !hiddenColumns.includes(name);
  const orderCount = ORDER_KEYS.filter((key) => isVisible(key)).length;
  const gradeCount = GRADE_KEYS.filter((key) => isVisible(key)).length;
  const strokesCount = isVisible(STROKES) ? 1 : 0;
  const freqCount = FREQUENCY_KEYS.filter((key) => isVisible(key)).length;
  const visibleCount = orderCount + gradeCount + strokesCount + freqCount + 1;
  const totalCount = thItems.length + 1;

  return (
    <div className="main-table-wrap table-wrap">
      <p className="visuallyhidden" aria-live="polite">
        {`Showing ${visibleCount} of ${totalCount} columns`}
      </p>
      <table
        className="main-table"
        id="main-table"
        aria-describedby="main-table-description"
        data-cols={visibleCount}
      >
        <colgroup>
          <col className="col-kanji" />
          {!!orderCount && <col span={orderCount} className="col-order" />}
          {!!gradeCount && <col span={gradeCount} className="col-grade" />}
          {!!strokesCount && <col className="col-strokes" />}
          {!!freqCount && <col span={freqCount} className="col-frequency" />}
        </colgroup>
        <thead>
          <tr>
            <td />
            {!!orderCount && (
              <th scope="colgroup" colSpan={orderCount}>
                {ORDER_LABEL}
              </th>
            )}
            {!!gradeCount && (
              <th scope="colgroup" colSpan={gradeCount}>
                {GRADE_LABEL}
              </th>
            )}
            {!!strokesCount && <td />}
            {!!freqCount && (
              <th scope="colgroup" colSpan={freqCount}>
                {FREQUENCY_LABEL}
              </th>
            )}
          </tr>
          <tr>
            <th scope="col">
              <span className="text">Kanji</span>
              <span className="ghost-icon" />
            </th>
            {thItems.map(
              ([field, label]) =>
                isVisible(field) && (
                  <SortableTh
                    {...thProps}
                    key={field}
                    field={field}
                    text={label}
                  />
                ),
            )}
          </tr>
        </thead>
        <MainTableBody
          {...ordering}
          filters={filters}
          hiddenColumns={hiddenColumns}
        />
      </table>
    </div>
  );
}
