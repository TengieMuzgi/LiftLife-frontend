import { ListItem } from '@mui/material';
import React from 'react';
import { useDrag } from 'react-dnd';
import { DndItemTypes } from '../Calendar.constants';

export type OptionPickerItemProps = {
  children: React.ReactNode;
  id: string;
};

export const OptionPickerItem = (props: OptionPickerItemProps) => {
  const { children, id } = props;

  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: DndItemTypes.OPTION_PICKER_ITEM,
      item: { id },
      collect: monitor => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    []
  );

  return (
    <ListItem ref={dragRef} sx={{ opacity }}>
      {children}
    </ListItem>
  );
};
