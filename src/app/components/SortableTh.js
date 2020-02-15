import React from 'react';
import pt from 'prop-types';

import { ORDER_ASC, ORDER_DESC, ORDER_NONE } from '../../constants';
import { cycleValues, usePrerenderFlag } from '../utils';
import Button from './Button';
import Icon from './Icon';

const ICON_NAMES = {
  [ORDER_ASC]: 'chevron-up',
  [ORDER_DESC]: 'chevron-down',
  [ORDER_NONE]: 'sort',
};
const ARIA_SORT = {
  [ORDER_ASC]: 'ascending',
  [ORDER_DESC]: 'descending',
};

function SortableTh({ field, order, orderBy, setOrdering, text }) {
  const isCurrent = orderBy === field;
  const iconKey = isCurrent ? order : ORDER_NONE;
  const ariaSort = isCurrent ? ARIA_SORT[order] : undefined;
  const isPrerendering = usePrerenderFlag();

  function handleClick() {
    setOrdering(
      field,
      // Cycle if currently active, otherwise start at DESC to get ASC
      cycleValues(isCurrent ? order : ORDER_DESC, ORDER_ASC, ORDER_DESC),
    );
  }
  let content = (
    <>
      <span className="text">{text}</span>
      <Icon name={ICON_NAMES[iconKey]} />
    </>
  );

  // Output text when prerendering, only adding buttons when JS is available
  if (isPrerendering) {
    content = <span className="btn-placeholder">{content}</span>;
  } else {
    content = (
      <Button onClick={handleClick} variant="neutral">
        {content}
      </Button>
    );
  }

  return (
    <th
      className="sortable-th"
      scope="col"
      role="columnheader"
      aria-sort={ariaSort}
    >
      {content}
    </th>
  );
}
SortableTh.propTypes = {
  field: pt.string.isRequired,
  order: pt.string.isRequired,
  orderBy: pt.string.isRequired,
  setOrdering: pt.func.isRequired,
  text: pt.string.isRequired,
};

function propsAreEqual(prevProps, nextProps) {
  // Neither previous nor next ordering is relevant to this field
  if (
    prevProps.field === nextProps.field &&
    nextProps.field !== prevProps.orderBy &&
    nextProps.field !== nextProps.orderBy
  ) {
    return true;
  }
  return (
    prevProps.order === nextProps.order &&
    prevProps.orderBy === nextProps.orderBy
  );
}
export default React.memo(SortableTh, propsAreEqual);
