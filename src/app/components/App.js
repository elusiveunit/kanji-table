import React, { useEffect } from 'react';
import FontFaceObserver from 'fontfaceobserver';

import { TABLE_ID } from '../../constants';
import { StoreProvider } from '../state/store';
import { IS_PRERENDERING } from '../utils';
import AppIntro from './AppIntro';
import MainTableIntro from './MainTableIntro';
import Filter from './Filter';
import Focus from './Focus';
import MainTable from './MainTable';
import MainTableDescription from './MainTableDescription';
import Skiplink from './Skiplink';
import ThemeSwitcher from './ThemeSwitcher';

// eslint-disable-next-line no-new
new Focus();

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
      console.warn(err);
    }
  }
}

export default function App() {
  useEffect(() => {
    onBrowserLoad();
  }, []);

  return (
    <StoreProvider>
      <Skiplink href={`#${TABLE_ID}`} isHidden>
        Skip to table
      </Skiplink>
      <div className="app">
        <div className="app-text">
          <AppIntro />
          <ThemeSwitcher />
          <MainTableDescription />
        </div>
        <Filter />
        <MainTableIntro />
        <MainTable />
      </div>
    </StoreProvider>
  );
}
