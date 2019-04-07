import React from 'react';

import GitHubLink from './GitHubLink';

export default function AppIntro() {
  return (
    <React.Fragment>
      <h1>Kanji Table</h1>
      <GitHubLink />
      <p>
        A<span className="js-only"> sortable and filterable</span> table of
        Japanese kanji. Each kanji is linked to its entry on{' '}
        <a href="https://jisho.org/">Jisho</a>.{' '}
        <span aria-hidden="true" className="js-only">
          Color schemes can be selected in the bottom right corner.
        </span>
      </p>
    </React.Fragment>
  );
}
AppIntro.displayName = 'AppIntro';
