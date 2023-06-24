import { Box, IconButton, TableCellBaseProps, useTheme } from '@mui/material';
import React, { ElementType } from 'react';
import { useDrop } from 'react-dnd';
import { DndItemTypes } from '../Calendar.constants';
import type { CalendarTileConfigType } from './CalendarTile.types';
import { ColoredTableCell } from './CalendarTile.styles';
import { DeleteOutlined } from '@mui/icons-material';

type CalendarTileProps = {
  width?: string | number;
  component?: ElementType<TableCellBaseProps>;
  scope?: string;
  onReserve?: (itemId: string, tileId: string) => void;
  onRemove?: (tileId: string) => void;
  id: string;
} & CalendarTileConfigType;

export const CalendarTile = ({
  width,
  component,
  scope,
  onReserve,
  onRemove,
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
        position: 'relative',
      }}
    >
      {children}
      {onRemove && isReserved && (
        <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
          <IconButton
            onClick={() => onRemove(id)}
            aria-label="remove"
            sx={{ color: theme.palette.common.white }}
          >
            <DeleteOutlined />
          </IconButton>
        </Box>
      )}
    </ColoredTableCell>
  );
};
