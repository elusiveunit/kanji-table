import React from 'react';
import floor from 'lodash/floor';

import {
  BUNKA,
  KANJI,
  PAPER_A4_WIDTH,
  PAPER_A4_HEIGHT,
  PAPER_PADDING,
} from '../../constants';
import { classNames, getPackedSquareSize, inRange } from '../utils';
import { togglePrintableGrid } from '../state/actions/ui';
import { useKanjiData, useStoreState } from '../state/store';
import Button from './Button';
import Icon from './Icon';

function mapState(state) {
  return {
    isVisible: state.ui.isPrintableGridVisible,
  };
}
const mapDispatch = {
  togglePrintableGrid,
};

export default function PrintableGrid() {
  const kanjiData = useKanjiData();
  const [{ isVisible }, d] = useStoreState(mapState, mapDispatch);

  if (!isVisible) {
    return null;
  }

  const kanjiCount = kanjiData.length;
  const width = PAPER_A4_WIDTH - PAPER_PADDING * 2;
  const height = PAPER_A4_HEIGHT - PAPER_PADDING * 2;
  const squareSizeRaw = getPackedSquareSize(width, height, kanjiCount);
  const squareSize = String(
    floor(squareSizeRaw - 0.1, squareSizeRaw < 6 ? 1 : 0),
  ).replace(/\./, '-');
  const colCount = floor(width / squareSizeRaw);
  const pageCls = classNames(`printable-grid__page sq-${squareSize}`, {
    'printable-grid__page--tiny': inRange(kanjiCount, 2000),
    'printable-grid__page--small': inRange(kanjiCount, 1500, 1999),
  });

  const handleCloseClick = () => {
    d.togglePrintableGrid(false);
  };

  return (
    <div className="printable-grid">
      <Button
        className="printable-grid__close"
        variant="neutral"
        aria-label="Close"
        onClick={handleCloseClick}
      >
        <Icon name="cross" />
      </Button>
      <div className={pageCls}>
        <div className="printable-grid__page-content">
          {kanjiData.map((data, i) => (
            <span
              key={data[KANJI]}
              lang="ja"
              className={classNames({
                'row-1': i <= colCount + 1,
                'low-freq': inRange(data[BUNKA], 1001),
              })}
            >
              {data[KANJI]}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
