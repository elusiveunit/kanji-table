import React from 'react';

import Icon from './Icon';

export default function GitHubLink() {
  return (
    <a
      href="https://github.com/elusiveunit/kanji-table"
      className="github-link"
    >
      <Icon name="github" />
      <span className="visuallyhidden">Source code on GitHub</span>
    </a>
  );
}
GitHubLink.displayName = 'GitHubLink';
