import React, { useState } from 'react';

import {
  FREQUENCY,
  KANJI,
  JLPT,
  JOYO,
  MIN_SUFFIX,
  MAX_SUFFIX,
  ROWS,
  STROKES,
} from '../../constants';
import { useDispatch } from '../state/store';
import { clearFilters, addFilter } from '../state/actions/filtering';
import {
  assign,
  getDataSelectOptions,
  getRangeFilterDataKey,
  isNumeric,
} from '../utils';

import BetweenInput from './BetweenInput';
import Button from './Button';
import Collapsible from './Collapsible';
import TextField from './TextField';
import Select from './Select';

const JLPT_OPTIONS = getDataSelectOptions(JLPT);
const JOYO_OPTIONS = getDataSelectOptions(JOYO);

let debounceTimer;

const inialState = {
  [KANJI]: '',
  [JLPT]: '',
  [JOYO]: '',
  [`${STROKES}${MIN_SUFFIX}`]: '',
  [`${STROKES}${MAX_SUFFIX}`]: '',
  [`${FREQUENCY}${MIN_SUFFIX}`]: '',
  [`${FREQUENCY}${MAX_SUFFIX}`]: '',
  [`${ROWS}${MIN_SUFFIX}`]: '',
  [`${ROWS}${MAX_SUFFIX}`]: '',
};

function isNumberField(fieldName) {
  return [STROKES, FREQUENCY, ROWS].includes(getRangeFilterDataKey(fieldName));
}

function isSelectField(fieldName) {
  return [JLPT, JOYO].includes(fieldName);
}

export default function Filter() {
  const d = useDispatch({ addFilter, clearFilters });
  const [values, setValues] = useState(inialState);
  const hasValues = Object.values(values).some((val) => val !== '');
  const setValue = (name, value) => {
    setValues(assign(values, { [name]: value }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value && isNumberField(name) && !isNumeric(value)) {
      return;
    }
    const current = values[name];
    // A change of more than one character likely means the field was cleared
    // or that something was pasted, no need to delay in that case.
    const debounceTime =
      isSelectField(name) || Math.abs(current.length - value.length) > 1
        ? 20
        : 350;
    setValue(name, value);
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const intVal = parseInt(value, 10);
      d.addFilter(name, value === String(intVal) ? intVal : value);
    }, debounceTime);
  };
  const handleReset = (e) => {
    e.preventDefault();
    setValues(inialState);
    d.clearFilters();
  };

  return (
    <Collapsible id="filter" heading="Filter" className="filter js-only">
      <p className="filter-info">
        Filtering and ordering happens in real-time and can take a few seconds
        depending on the number of rows and your&nbsp;device.
      </p>
      <form noValidate onReset={handleReset}>
        <div className="filter-kanji">
          <TextField
            type="textarea"
            id="filter-kanji"
            name={KANJI}
            fieldClassName="jp"
            label="Only kanji contained in this text"
            value={values[KANJI]}
            onChange={handleChange}
            autoHeight
          />
        </div>
        <Select
          id="filter-jlpt"
          name={JLPT}
          className="filter-block filter-jlpt"
          label="JLPT level"
          emptyOptionLabel="Any"
          options={JLPT_OPTIONS}
          value={values[JLPT]}
          onChange={handleChange}
        />
        <Select
          id="filter-joyo"
          name={JOYO}
          className="filter-block filter-joyo"
          label="Jōyō grade"
          emptyOptionLabel="Any"
          options={JOYO_OPTIONS}
          value={values[JOYO]}
          onChange={handleChange}
        />
        <BetweenInput
          label="Stroke count"
          name={STROKES}
          id="filter-stroke-count"
          className="filter-block filter-stroke-count"
          onMinChange={handleChange}
          onMaxChange={handleChange}
          valueMin={values[`${STROKES}${MIN_SUFFIX}`]}
          valueMax={values[`${STROKES}${MAX_SUFFIX}`]}
        />
        <BetweenInput
          label="Frequency"
          name={FREQUENCY}
          id="filter-frequency"
          className="filter-block filter-frequency"
          onMinChange={handleChange}
          onMaxChange={handleChange}
          valueMin={values[`${FREQUENCY}${MIN_SUFFIX}`]}
          valueMax={values[`${FREQUENCY}${MAX_SUFFIX}`]}
        />
        <BetweenInput
          label="Visible rows"
          name={ROWS}
          id="filter-rows"
          className="filter-block filter-rows"
          onMinChange={handleChange}
          onMaxChange={handleChange}
          valueMin={values[`${ROWS}${MIN_SUFFIX}`]}
          valueMax={values[`${ROWS}${MAX_SUFFIX}`]}
        />
        <Button type="reset" className="filter-reset" disabled={!hasValues}>
          Reset
        </Button>
      </form>
    </Collapsible>
  );
}
