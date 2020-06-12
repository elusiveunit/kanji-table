import React, { useRef, useState } from 'react';

import { KANJI } from '../../constants';
import { useKanjiData } from '../state/store';
import Button from './Button';

export default function ClipboardCopy() {
  const [status, setStatus] = useState(null);
  const timerRef = useRef(null);
  const kanjiData = useKanjiData();

  const handleClick = () => {
    const makeDoneCallback = (newStatus) => () => {
      setStatus(newStatus);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setStatus(null);
      }, 1500);
    };
    navigator.clipboard
      .writeText(kanjiData.map((d) => d[KANJI]).join(''))
      .then(
        makeDoneCallback(`Copied ${kanjiData.length} kanji`),
        makeDoneCallback('Copy failed'),
      );
  };

  return (
    <div className="clipboard-copy">
      {status && <div className="clipboard-copy-status">{status}</div>}
      <Button variant="secondary" onClick={handleClick}>
        Copy kanji from current rows
      </Button>
    </div>
  );
}
