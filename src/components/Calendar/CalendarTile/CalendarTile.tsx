import { IconButton, TableCellBaseProps, useTheme } from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';
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
  onRemove?: (tileId: string) => void;
  onClick?: (tileId: string) => void;
  id: string;
} & CalendarTileConfigType;

export const CalendarTile = ({
  width,
  component,
  scope,
  onReserve,
  onRemove,
  onClick,
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

  function handleClick() {
    if (onClick) {
      onClick(id);
    }
  }

  const [, drop] = useDrop(() => ({
    accept: DndItemTypes.OPTION_PICKER_ITEM,
    drop: handleDrop,
  }));

  return (
    <ColoredTableCell
      ref={drop}
      component={component}
      scope={scope}
      sx={{
        background: isReserved ? theme.palette.secondary.main : theme.palette.common.white,
        color: isReserved ? theme.palette.common.white : theme.palette.common.black,
        width: width,
      }}
      onClick={handleClick}
    >
      {/**
       * Temporary solution for testing. ultimately we want to remove sessions in modal instead of calendar itself
       */}
      {onRemove && children && (
        <IconButton
          onClick={() => {
            onRemove(id);
          }}
          sx={{ position: 'absolute', top: 0, right: 0 }}
        >
          <CloseOutlined sx={{ width: '10px', height: '10px' }} />
        </IconButton>
      )}
      {children}
    </ColoredTableCell>
  );
};
