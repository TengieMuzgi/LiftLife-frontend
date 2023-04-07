import { TableCellBaseProps, useTheme } from '@mui/material';
import React, { ElementType } from 'react';
import { useDrop } from 'react-dnd';
import { DndItemTypes } from '../Calendar.constants';
import type { CalendarTileConfigType } from './CalendarTile.types';
import { ColoredTableCell } from './CalendarTile.styles';

type CalendarTileProps = {
  width?: string | number;
  component?: ElementType<TableCellBaseProps>;
  scope?: string;
  onReserve?: (itemId: string, tileId: string) => void;
  id: string;
} & CalendarTileConfigType;

export const CalendarTile = ({
  width,
  component,
  scope,
  onReserve,
  id,
  children,
  isReserved,
}: CalendarTileProps) => {
  const theme = useTheme();

  // TODO: implement defined type
  function handleDrop(item: { id: string }) {
    if (onReserve) {
      onReserve(item.id, id);
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
