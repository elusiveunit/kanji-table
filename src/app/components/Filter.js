import React, { useCallback } from 'react';

import { KANJI, JLPT, JOYO, STROKES } from '../../constants';
import { useDispatch } from '../state/store';
import { filter } from '../state/actions/filtering';
import { getDataSelectOptions } from '../utils';

import BetweenInput from './BetweenInput';
import Collapsible from './Collapsible';
import Select from './Select';

const JLPT_OPTIONS = getDataSelectOptions(JLPT);
const JOYO_OPTIONS = getDataSelectOptions(JOYO);
const FREQUENCY_NAME = 'frequency';

export default function Filter() {
  const d = useDispatch({ filter });
  const handleChange = useCallback((e) => {
    const val = e.target.value;
    const intVal = parseInt(val, 10);
    d.filter(e.target.name, val === String(intVal) ? intVal : val);
  });

  return (
    <Collapsible id="filter" heading="Filter" className="filter">
      <div className="filter-kanji">
        <label htmlFor="filter-kanji">
          <span className="text">Only these kanji:</span>
          <input
            type="text"
            id="filter-kanji"
            name={KANJI}
            className="jp"
            onChange={handleChange}
          />
        </label>
      </div>
      <Select
        id="filter-jlpt"
        name={JLPT}
        className="filter-jlpt"
        label="JLPT level"
        emptyOptionLabel="Any"
        options={JLPT_OPTIONS}
        onChange={handleChange}
      />
      <Select
        id="filter-joyo"
        name={JOYO}
        className="filter-joyo"
        label="Jōyō grade"
        emptyOptionLabel="Any"
        options={JOYO_OPTIONS}
        onChange={handleChange}
      />
      <BetweenInput
        label="Stroke count"
        name={STROKES}
        id="filter-stroke-count"
        className="filter-stroke-count"
        onMinChange={handleChange}
        onMaxChange={handleChange}
      />
      <BetweenInput
        label="Frequency"
        name={FREQUENCY_NAME}
        id="filter-frequency"
        className="filter-frequency"
        onMinChange={handleChange}
        onMaxChange={handleChange}
      />
    </Collapsible>
  );
}
Filter.displayName = 'Filter';
