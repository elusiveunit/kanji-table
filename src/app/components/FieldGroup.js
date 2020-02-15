import React from 'react';
import pt from 'prop-types';

export default function FieldGroup({ children, label, labelId }) {
  return (
    <div className="field-group" role="group" aria-labelledby={labelId}>
      <p className="field-group-label">{label}</p>
      {children}
    </div>
  );
}
FieldGroup.propTypes = {
  children: pt.node.isRequired,
  label: pt.string.isRequired,
  labelId: pt.string.isRequired,
};
