import React, { useCallback } from 'react';

import {
  AOZORA,
  AOZORA_LABEL,
  BUNKA,
  BUNKA_LABEL,
  CHILDREN_KEY,
  FREQUENCY_LABEL,
  FREQUENCY,
  GRADE_LABEL,
  GRADE,
  JLPT,
  JLPT_LABEL,
  JOYO,
  JOYO_LABEL,
  KKLC,
  KKLC_LABEL,
  NEWS,
  NEWS_LABEL,
  ORDER_LABEL,
  ORDER,
  RTK,
  RTK_LABEL,
  STROKES,
  STROKES_LABEL,
  TWITTER,
  TWITTER_LABEL,
  WIKIPEDIA,
  WIKIPEDIA_LABEL,
} from '../../constants';
import { setHiddenColumns } from '../state/actions/ui';
import { useDispatch } from '../state/store';
import { getLeafNodes } from '../utils';
import CheckboxTree from './CheckboxTree';
import Icon from './Icon';
import ToggleDialog from './ToggleDialog';

function makeControl(name, label, children) {
  return {
    name,
    label,
    [CHILDREN_KEY]: children,
    checked: true,
    indeterminate: false,
  };
}

const CONTROLS = [
  makeControl(ORDER, ORDER_LABEL, [
    makeControl(KKLC, KKLC_LABEL),
    makeControl(RTK, RTK_LABEL),
  ]),
  makeControl(GRADE, GRADE_LABEL, [
    makeControl(JLPT, JLPT_LABEL),
    makeControl(JOYO, JOYO_LABEL),
  ]),
  makeControl(STROKES, STROKES_LABEL),
  makeControl(FREQUENCY, FREQUENCY_LABEL, [
    makeControl(BUNKA, BUNKA_LABEL),
    makeControl(AOZORA, AOZORA_LABEL),
    makeControl(NEWS, NEWS_LABEL),
    makeControl(TWITTER, TWITTER_LABEL),
    makeControl(WIKIPEDIA, WIKIPEDIA_LABEL),
  ]),
];

export default function ColumnSelector() {
  const d = useDispatch({ setHiddenColumns });
  const handleChange = useCallback(
    (tree) => {
      d.setHiddenColumns(
        getLeafNodes(tree)
          .filter(({ checked }) => !checked)
          .map(({ name }) => name),
      );
    },
    [d],
  );

  const buttonText = (
    <>
      <Icon name="column" />
      <span className="text">Select columns</span>
    </>
  );

  return (
    <ToggleDialog
      name="column-selector"
      buttonLabelClosed="Open column selector"
      buttonLabelOpened="Close column selector"
      buttonText={buttonText}
      buttonExtraProps={{
        variant: 'secondary',
      }}
    >
      <CheckboxTree controls={CONTROLS} onChange={handleChange} />
    </ToggleDialog>
  );
}
