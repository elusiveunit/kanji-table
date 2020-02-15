import React, { useRef, useState } from 'react';

import { KANJI } from '../../constants';
import { useKanjiData } from '../state/store';
import Button from './Button';

const STATUS_SUCCESS = 'Copied!';
const STATUS_ERROR = 'Copy failed';

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
      .then(makeDoneCallback(STATUS_SUCCESS), makeDoneCallback(STATUS_ERROR));
  };

  return (
    <div className="clipboard-copy">
      {status && <div className="clipboard-copy-status">{status}</div>}
      <Button variant="secondary" onClick={handleClick}>
        Copy curent rows
      </Button>
    </div>
  );
}
