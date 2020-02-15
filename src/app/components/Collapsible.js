import React from 'react';
import pt from 'prop-types';

import { useStoreState } from '../state/store';
import { toggleCollapsible } from '../state/actions/ui';
import Button from './Button';
import Icon from './Icon';

function mapState(state) {
  return state.ui.collapsedSections;
}
const mapDispatch = {
  toggleCollapsible,
};

export default function Collapsible({ children, className, heading, id }) {
  const [collapsedSections, d] = useStoreState(mapState, mapDispatch);
  const isCollapsed = collapsedSections.includes(id);
  const classSuffix = isCollapsed ? 'collapsed' : 'expanded';
  const headingId = `${id}-heading`;
  const contentId = `collapsible-${id}`;
  const cls = `collapsible collapsible--${classSuffix} ${className}`.trim();

  return (
    <div className={cls} id={id}>
      <h2 className="collapsible-heading" id={headingId}>
        {heading}
      </h2>
      <Button
        variant="neutral"
        className="collapsible-toggle js-only"
        onClick={() => {
          d.toggleCollapsible(id);
        }}
        aria-describedby={headingId}
        aria-controls={contentId}
        aria-expanded={String(!isCollapsed)}
      >
        <Icon name="chevron-down" />
        <span className="visuallyhidden">
          {isCollapsed ? 'Expand' : 'Collapse'}
        </span>
      </Button>
      <div className="collapsible-content" id={contentId}>
        {children}
      </div>
    </div>
  );
}
Collapsible.propTypes = {
  children: pt.node.isRequired,
  className: pt.string,
  heading: pt.string.isRequired,
  id: pt.string.isRequired,
};
Collapsible.defaultProps = {
  className: '',
};
