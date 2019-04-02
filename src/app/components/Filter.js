import React from 'react';

import kanjiData from '../../../data/kanji.json';
import {
  KKLC,
  RTK,
  AOZORA,
  NEWS,
  TWITTER,
  WIKIPEDIA,
  BUNKA,
  JLPT,
  JOYO,
  STROKES,
} from '../../constants';
import { useStoreState } from '../state/store';
import { setOrdering } from '../state/actions/ordering';
import { getDataSelectOptions } from '../utils';

import BetweenInput from './BetweenInput';
import Collapsible from './Collapsible';
import Select from './Select';

const JLPT_OPTIONS = getDataSelectOptions(JLPT);
const JOYO_OPTIONS = getDataSelectOptions(JOYO);

export default function Filter() {
  const [ordering, d] = useStoreState((state) => state.ordering, {
    setOrdering,
  });
  const handleChange = () => {};

  return (
    <Collapsible id="filter" heading="Filter" className="filter">
      <div className="filter-kanji">
        <label htmlFor="filter-kanji">
          <span className="text">Only these kanji:</span>
          <input
            type="text"
            id="filter-kanji"
            className="jp"
            onChange={handleChange}
          />
        </label>
      </div>
      <Select
        id="filter-jlpt"
        className="filter-jlpt"
        label="JLPT level"
        emptyOptionLabel="Any"
        options={JLPT_OPTIONS}
        onChange={handleChange}
      />
      <Select
        id="filter-joyo"
        className="filter-joyo"
        label="Jōyō grade"
        emptyOptionLabel="Any"
        options={JOYO_OPTIONS}
        onChange={handleChange}
      />
      <BetweenInput
        label="Stroke count"
        id="filter-stroke-count"
        className="filter-stroke-count"
        onMinChange={handleChange}
        onMaxChange={handleChange}
      />
      <BetweenInput
        label="Frequency"
        id="filter-frequency"
        className="filter-frequency"
        onMinChange={handleChange}
        onMaxChange={handleChange}
      />
    </Collapsible>
  );
}
Filter.displayName = 'Filter';
