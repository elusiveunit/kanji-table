import React from 'react';

import GitHubLink from './GitHubLink';

export default function AppIntro() {
  return (
    <React.Fragment>
      <h1>Kanji Table</h1>
      <GitHubLink />
      <p>A sortable and filterable table of Japanese kanji.</p>
    </React.Fragment>
  );
}
AppIntro.displayName = 'AppIntro';
