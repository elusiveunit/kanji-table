import React from 'react';

import ClipboardCopy from './ClipboardCopy';
import ViewControl from './ViewControl';

export default function MainTableIntro() {
  return (
    <div className="main-table-intro js-only">
      <div className="main-table-intro-col">
        <p className="perf-info">
          Note that filtering and ordering can take a few seconds depending on
          the number of rows and your&nbsp;device.
        </p>
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
