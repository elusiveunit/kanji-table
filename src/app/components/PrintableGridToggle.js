import React from 'react';

import { togglePrintableGrid } from '../state/actions/ui';
import { useDispatch } from '../state/store';
import Button from './Button';

export default function PrintableGridToggle() {
  const d = useDispatch({ togglePrintableGrid });

  const handleViewClick = () => {
    d.togglePrintableGrid(true);
  };

  return (
    <Button variant="secondary" onClick={handleViewClick}>
      Printable grid…
    </Button>
  );
}
