import React from 'react';

import { useKanjiData } from '../state/store';
import ClipboardCopy from './ClipboardCopy';
import ViewControl from './ViewControl';

export default function MainTableIntro() {
  const kanjiData = useKanjiData();

  return (
    <div className="main-table-intro js-only">
      <div className="main-table-intro-col">
        <h2 aria-live="polite" aria-atomic="true">
          {kanjiData.length} rows
        </h2>
      </div>
      <div className="main-table-intro-col">
        <ClipboardCopy />
      </div>
      <div className="main-table-intro-col">
        <ViewControl />
      </div>
    </div>
  );
}
