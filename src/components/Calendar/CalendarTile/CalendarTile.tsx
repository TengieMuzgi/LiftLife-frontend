import { TableCellBaseProps, useTheme } from '@mui/material';
import React, { ElementType } from 'react';
import { useDrop } from 'react-dnd';
import { DndItemTypes } from '../Calendar.constants';
import { CalendarTileConfigType } from './CalendarTile.constants';
import { ColoredTableCell } from './CalendarTile.styles';

type CalendarTileProps = {
  width?: string | number;
  component?: ElementType<TableCellBaseProps>;
  scope?: string;
  onReserve?: (id: string) => void;
  id: string;
} & CalendarTileConfigType;

export const CalendarTile = (props: CalendarTileProps) => {
  const { width, component, scope, children, isReserved, onReserve } = props;
  const theme = useTheme();

  // TODO: implement defined type
  function handleDrop(item: { id: string }) {
    if (onReserve) {
      onReserve(item.id);
    }
  }

  const [, drop] = useDrop(() => ({
    accept: DndItemTypes.OPTION_PICKER_ITEM,
    drop: handleDrop,
  }));

  return (
    <ColoredTableCell
      ref={drop}
      width={width}
      component={component}
      scope={scope}
      sx={{
        background: isReserved ? theme.palette.secondary.main : theme.palette.common.white,
        color: isReserved ? theme.palette.common.white : theme.palette.common.black,
      }}
    >
      {children}
    </ColoredTableCell>
  );
};
