import React from 'react';

import Collapsible from './Collapsible';

export default function MainTableDescription() {
  return (
    <Collapsible
      id="main-table-description"
      heading="Column descriptions and sources/credits"
    >
      <ul>
        <li>
          The <strong>order</strong> column values are positional numbers from
          different&nbsp;sources.
          <ul>
            <li>
              <strong>KKLC:</strong> order in{' '}
              <i>The Kodansha Kanji Learner’s Course</i> by Andrew Scott Conning
              (ISBN&nbsp;9781568365268).
            </li>
            <li>
              <strong>RTK:</strong> order in{' '}
              <i>Remembering The Kanji 1, 6th edition</i> by James W. Heisig
              (ISBN&nbsp;9780824835927).
            </li>
          </ul>
        </li>
        <li>
          The <strong>grade</strong> column values are school or test grades to
          get a sense of&nbsp;difficulty.
          <ul>
            <li>
              <strong>JLPT:</strong> <em>estimated</em>{' '}
              <a href="https://www.jlpt.jp/e/">
                JLPT (Japanese Language Proficiency Test)
              </a>{' '}
              level, from{' '}
              <a href="http://www.tanos.co.uk/jlpt/skills/kanji/">
                Jonathan Waller’s JLPT Resources
              </a>
              , since there is no official JLPT kanji&nbsp;list.
            </li>
            <li>
              <strong>Jōyō:</strong> the grade in which the kanji is taught in
              schools in Japan, where the numbers represent grade 1-6 in
              elementary school while ’S’ means it’s taught in
              secondary&nbsp;school.
            </li>
          </ul>
        </li>
        <li>
          The <strong>strokes</strong> column simply contains the stroke count.
        </li>
        <li>
          The <strong>frequency</strong> column values are rankings for how
          often a kanji appears in different contexts, where a lower number
          means it appears more often (e.g. number 1 is the most
          common&nbsp;kanji).
          <ul>
            <li>
              <strong>Bunka:</strong> rank from the{' '}
              <a href="http://www.bunka.go.jp/seisaku/bunkashingikai/kokugo/kanji_kako/24/pdf/sanko_3.pdf">
                Kanji frequency list ver. 1.3 by the Japanese Agency for
                Cultural&nbsp;Affairs (PDF)
              </a>
              .
            </li>
            <li>
              <strong>Aozora</strong>, <strong>news</strong>,{' '}
              <strong>Twitter</strong> and <strong>wiki</strong> all come from
              the{' '}
              <a href="https://github.com/scriptin/kanji-frequency">
                scriptin/kanji-frequency
              </a>{' '}
              GitHub repository, where <strong>Aozora</strong> is{' '}
              <q cite="https://github.com/scriptin/kanji-frequency">
                Fiction and non-fiction books from{' '}
                <a href="http://www.aozora.gr.jp/" rel="nofollow">
                  Aozora Bunko
                </a>
              </q>
              , <strong>news</strong> is{' '}
              <q cite="https://github.com/scriptin/kanji-frequency">
                Online news articles from various sources
              </q>
              , <strong>Twitter</strong> is{' '}
              <q cite="https://github.com/scriptin/kanji-frequency">
                Twitter messages collected by a bot
              </q>{' '}
              and <strong>wiki</strong> is{' '}
              <q cite="https://github.com/scriptin/kanji-frequency">
                Wikipedia articles and pages from{' '}
                <a href="https://dumps.wikimedia.org/">dumps</a>
              </q>
              . See the repository README for&nbsp;details.
            </li>
          </ul>
        </li>
      </ul>
    </Collapsible>
  );
}
MainTableDescription.displayName = 'MainTableDescription';
