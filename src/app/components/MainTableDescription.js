import React from 'react';

export default function MainTableDescription() {
  return (
    <div id="main-table-description">
      <h2>Column descriptions and sources/credits</h2>
      <ul>
        <li>
          The <strong>order</strong> column values are positional numbers from
          different sources.
          <ul>
            <li>
              <strong>KKLC:</strong> Order in{' '}
              <i>The Kodansha Kanji Learner’s Course</i> by Andrew Scott Conning
              (ISBN 9781568365268).
            </li>
            <li>
              <strong>RTK:</strong> Order in{' '}
              <i>Remembering The Kanji 1, 6th edition</i> by James W. Heisig
              (ISBN 9780824835927).
            </li>
          </ul>
        </li>
        <li>
          The <strong>frequency</strong> column values are rankings for how
          often a kanji appears in different contexts, where a lower number
          means it appears more often (e.g. number 1 is the most common kanji).
          <ul>
            <li>
              <strong>Bunka:</strong> rank from the{' '}
              <a href="http://www.bunka.go.jp/seisaku/bunkashingikai/kokugo/kanji_kako/24/pdf/sanko_3.pdf">
                Kanji frequency list ver. 1.3 by the Japanese Agency for
                Cultural Affairs
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
              . See the repository README for details.
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
MainTableDescription.displayName = 'MainTableDescription';
