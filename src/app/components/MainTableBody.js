/**
 * Renders the rows in chunks with requestAnimationFrame to prevent the browser
 * from hanging too long when sorting a large result set.
 */

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import pt from 'prop-types';
import chunk from 'lodash/chunk';

import fullKanjiData from '../../../data/kanji-compressed.json';
import { range, usePrevious } from '../utils';
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

/* eslint-disable jsx-a11y/control-has-associated-label */

// Hardcoding 30 as the row height, which comes from a compact row at regular
// font size. The chunk size isn't super important but should ideally cover
// at least one screen of rows.
const FULL_KANJI_COUNT = fullKanjiData.length;
const CHUNK_SIZE = Math.ceil(Math.max(window.screen.height / 30, 30));
const TOTAL_CHUNK_COUNT = Math.floor(FULL_KANJI_COUNT / CHUNK_SIZE);
const CHUNK_RANGE = range(0, TOTAL_CHUNK_COUNT - 1);

const blankCell = <span aria-label="None">—</span>;

function RawBodyChunk({ hiddenColumns, isVisible, kanjiData }) {
  const hasRows = kanjiData[0][KANJI] !== undefined;
  if (!hasRows) {
    return null;
  }
  const hasRealData = kanjiData[0][KKLC] !== undefined;
  const cls = hasRealData ? undefined : 'hidden';
  const isColVisible = (name) => !hiddenColumns.includes(name);

  return kanjiData.map((d) => {
    return isVisible ? (
      <tr key={d[KANJI]} className={cls}>
        <th scope="row" lang="ja">
          <a
            href={`https://jisho.org/search/${encodeURIComponent(
              d[KANJI],
            )}%23kanji`}
          >
            {d[KANJI]}
          </a>
        </th>
        {isColVisible(KKLC) && <td>{d[KKLC] || blankCell}</td>}
        {isColVisible(RTK) && <td>{d[RTK] || blankCell}</td>}
        {isColVisible(JLPT) && <td>{d[JLPT] || blankCell}</td>}
        {isColVisible(JOYO) && <td>{d[JOYO] || blankCell}</td>}
        {isColVisible(STROKES) && <td>{d[STROKES] || blankCell}</td>}
        {isColVisible(BUNKA) && <td>{d[BUNKA] || blankCell}</td>}
        {isColVisible(AOZORA) && <td>{d[AOZORA] || blankCell}</td>}
        {isColVisible(NEWS) && <td>{d[NEWS] || blankCell}</td>}
        {isColVisible(TWITTER) && <td>{d[TWITTER] || blankCell}</td>}
        {isColVisible(WIKIPEDIA) && <td>{d[WIKIPEDIA] || blankCell}</td>}
      </tr>
    ) : (
      <tr key={d[KANJI]} className={cls}>
        <th
          scope="row"
          lang="ja"
          colSpan="11"
          className="ghost-row"
          aria-hidden="true"
        >
          日
        </th>
      </tr>
    );
  });
}
function bodyChunkPropsAreEqual(prev, next) {
  return (
    prev.isVisible === next.isVisible &&
    JSON.stringify(prev.hiddenColumns) === JSON.stringify(next.hiddenColumns)
  );
}
const BodyChunk = React.memo(RawBodyChunk, bodyChunkPropsAreEqual);

function MainTableBody(props) {
  const { hiddenColumns, kanjiData } = props;
  const prevProps = usePrevious(props);
  const chunkedData = chunk(kanjiData, CHUNK_SIZE);
  const [visibleChunks, setVisibleChunks] = useState(1);
  const forceResetRef = useRef(null);
  const timerRef = useRef(null);
  const resultCount = kanjiData.length;
  const hasResults = Boolean(resultCount);

  // Keep track of prop changes and set a ref as a hacky way to reset the
  // visible count before rendering when the props change. Doing it in a hook
  // would result in all rows re-rendering before the staggered rendering can
  // run, making the entire thing pointless.
  if (prevProps && prevProps !== props && visibleChunks > 5) {
    forceResetRef.current = true;
    cancelAnimationFrame(timerRef.current);
  }
  // Actually reset the count when the render for the forced reset is done.
  useLayoutEffect(() => {
    setVisibleChunks(1);
  }, [props]);
  useEffect(() => {
    if (visibleChunks < TOTAL_CHUNK_COUNT) {
      timerRef.current = requestAnimationFrame(() => {
        setVisibleChunks(visibleChunks + 1);
        forceResetRef.current = false;
      });
    }
  }, [visibleChunks]);

  return (
    <tbody>
      {!hasResults && (
        <tr>
          <td className="no-results" colSpan="11">
            No results
          </td>
        </tr>
      )}
      {CHUNK_RANGE.map((i) => {
        const isVisible = forceResetRef.current ? i === 0 : i < visibleChunks;
        const data =
          isVisible && chunkedData[i]
            ? chunkedData[i]
            : range(0, CHUNK_SIZE).map((j) => ({ [KANJI]: `${i}-${j}` }));
        return (
          <BodyChunk
            // Using indexed keys for hidden chunks to avoid re-rendering them
            // all when the kanji data is changed (which happens if the key
            // changes). Since they're all showing the same thing this won't
            // result in any incorrect rendering.
            key={isVisible ? data.map((d) => d[KANJI]).join('') : i}
            hiddenColumns={hiddenColumns}
            kanjiData={data}
            isVisible={isVisible}
          />
        );
      })}
    </tbody>
  );
}
MainTableBody.propTypes = {
  hiddenColumns: pt.arrayOf(pt.string).isRequired,
  kanjiData: pt.arrayOf(pt.object).isRequired,
};

function propsAreEqual(prev, next) {
  return (
    prev.hiddenColumns === next.hiddenColumns &&
    prev.kanjiData === next.kanjiData
  );
}
export default React.memo(MainTableBody, propsAreEqual);
