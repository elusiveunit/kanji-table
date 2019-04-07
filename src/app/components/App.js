import React, { useEffect } from 'react';
import FontFaceObserver from 'fontfaceobserver';

import { StoreProvider } from '../state/store';
import { IS_PRERENDERING } from '../utils';

import AppIntro from './AppIntro';
import Filter from './Filter';
import Focus from './Focus';
import MainTable from './MainTable';
import MainTableDescription from './MainTableDescription';
import Skiplink from './Skiplink';
import ThemeSwitcher from './ThemeSwitcher';

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
      <Focus />
      <Skiplink href="#main-table" isHidden>
        Skip to table
      </Skiplink>
      <div className="app">
        <div className="app-text">
          <AppIntro />
          <ThemeSwitcher />
          <MainTableDescription />
        </div>
        <Filter />
        <MainTable />
      </div>
    </StoreProvider>
  );
}
App.displayName = 'App';
