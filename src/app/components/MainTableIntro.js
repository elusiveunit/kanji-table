import React from 'react';

import ColumnSelector from './ColumnSelector';

export default function MainTableIntro() {
  return (
    <div className="main-table-intro js-only">
      <p className="perf-info">
        Note that filtering and ordering can take a few seconds depending on the
        number of rows and your&nbsp;device.
      </p>
      <ColumnSelector />
    </div>
  );
}
