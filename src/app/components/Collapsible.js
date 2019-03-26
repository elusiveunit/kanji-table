import React from 'react';
import pt from 'prop-types';

import { useStoreState } from '../state/store';
import { toggleCollapsible } from '../state/actions/ui';
import Button from './Button';
import Icon from './Icon';

export default function Collapsible(props) {
  const { children, heading, id } = props;
  const [{ collapsedSections }, d] = useStoreState((state) => state.ui, {
    toggleCollapsible,
  });
  const isCollapsed = collapsedSections.includes(id);
  const classSuffix = isCollapsed ? 'collapsed' : 'expanded';
  const headingId = `${id}-heading`;
  const contentId = `collapsible-${id}`;

  return (
    <div className={`collapsible collapsible--${classSuffix}`} id={id}>
      <h2 className="collapsible-heading" id={headingId}>
        {heading}
      </h2>
      <Button
        variant="neutral"
        className="collapsible-toggle"
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
Collapsible.displayName = 'Collapsible';
Collapsible.propTypes = {
  children: pt.node.isRequired,
  heading: pt.string.isRequired,
  id: pt.string.isRequired,
};
