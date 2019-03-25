import React, { useEffect } from 'react';
import FontFaceObserver from 'fontfaceobserver';

import { StoreProvider } from '../state/store';
import { IS_PRERENDERING } from '../utils';

import Focus from './Focus';
import MainTable from './MainTable';
import MainTableDescription from './MainTableDescription';
import Skiplink from './Skiplink';

async function onBrowserLoad() {
  if (!IS_PRERENDERING) {
    const html = document.documentElement;
    html.classList.add('js-loaded');

    const font = new FontFaceObserver('Source Han Serif');
    try {
      await font.load('字');
      html.classList.add('jp-font-loaded');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }
}

export default function App() {
  useEffect(() => {
    onBrowserLoad();
  }, []);

  return (
    <StoreProvider>
      <Focus />
      <div className="app">
        <Skiplink href="#main-table" isHidden>
          Skip to table
        </Skiplink>
        <div className="app-text">
          <h1>Kanji Table</h1>
          <p>A sortable and filterable table of Japanese kanji.</p>
          <MainTableDescription />
        </div>
        <MainTable />
      </div>
    </StoreProvider>
  );
}
App.displayName = 'App';
