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
import { setHiddenColumns, toggleCompact } from '../state/actions/ui';
import { useStoreState } from '../state/store';
import { getLeafNodes } from '../utils';
import Checkbox from './Checkbox';
import CheckboxTree from './CheckboxTree';
import FieldGroup from './FieldGroup';
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

function mapState(state) {
  return {
    isCompact: state.ui.isCompact,
  };
}
const mapDispatch = {
  setHiddenColumns,
  toggleCompact,
};

export default function ViewControl() {
  const [{ isCompact }, d] = useStoreState(mapState, mapDispatch);
  // const d = useDispatch({ setHiddenColumns, toggleCompact });
  const handleTreeChange = useCallback(
    (tree) => {
      d.setHiddenColumns(
        getLeafNodes(tree)
          .filter(({ checked }) => !checked)
          .map(({ name }) => name),
      );
    },
    [d],
  );
  const handleCompactChange = useCallback(
    (e) => {
      d.toggleCompact(e.target.checked);
    },
    [d],
  );

  const buttonText = (
    <>
      <Icon name="column" />
      <span className="text">View…</span>
    </>
  );

  return (
    <ToggleDialog
      name="view-control"
      buttonText={buttonText}
      buttonExtraProps={{
        variant: 'secondary',
      }}
    >
      <div>
        <Checkbox
          id="view-compact"
          name="view-compact"
          label="Compact"
          checked={isCompact}
          onChange={handleCompactChange}
        />
      </div>
      <FieldGroup label="Columns" labelId="view-columns">
        <CheckboxTree controls={CONTROLS} onChange={handleTreeChange} />
      </FieldGroup>
    </ToggleDialog>
  );
}
