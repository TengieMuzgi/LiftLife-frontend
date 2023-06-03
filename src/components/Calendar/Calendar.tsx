import React, { useContext } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Typography,
  useTheme,
} from '@mui/material';
import type { CalendarConfigType } from './Calendar.types';
import { ColoredTableRow } from './Calendar.styles';
import { OptionPicker } from './OptionPicker/OptionPicker';
import { CalendarTile } from './CalendarTile/CalendarTile';
import { OptionPickerItemProps } from './OptionPicker/OptionPickerItem';
import { AppContext } from '../../App';

type CalendarProps = {
  sx?: React.CSSProperties;
  /**
   * Config object that determines the components' behavior
   */
  calendarConfig: CalendarConfigType;
  /**
   *
   * @param itemId id of `OptionPickerItem` that was dragged
   * @param tileId id of `CalendarTile` that triggered drop event
   * @returns
   */
  onDrop?: (itemId: string, tileId: string) => void;
  /**
   * Set of data to be shown in OptionPicker
   */
  options?: Array<OptionPickerItemProps>;
  /**
   * If set, the `OptionPicker` component will be shown
   */
  showOptionPicker?: boolean;
  optionPickerTitle?: string;
};

export const Calendar = ({
  sx,
  onDrop,
  options,
  showOptionPicker,
  optionPickerTitle,
  calendarConfig,
}: CalendarProps) => {
  const theme = useTheme();
  const { isMobile } = useContext(AppContext);
  const columnWidth = 100 / 8 + '%';

  return (
    <Box display="flex">
      <TableContainer sx={sx} component={Paper}>
        <Table size="small">
          <TableHead>
            <ColoredTableRow>
              <CalendarTile id="placeholder" width={columnWidth}></CalendarTile>
              {calendarConfig.columnDescriptors.map((node, i) => (
                <CalendarTile id={i.toString()} key={i.toString()} width={columnWidth}>
                  <Box>{node}</Box>
                </CalendarTile>
              ))}
            </ColoredTableRow>
          </TableHead>
          <TableBody>
            {calendarConfig.rowDescriptors.map((descriptor, index) => (
              <ColoredTableRow key={`${descriptor}-${index}`}>
                <>
                  <CalendarTile width={columnWidth} component="th" scope="row" id={descriptor}>
                    <Typography
                      sx={{
                        backgroundColor: theme.palette.background.paper,
                        position: 'relative',
                      }}
                      marginTop="-28px"
                      textAlign="center"
                    >
                      {descriptor}
                    </Typography>
                  </CalendarTile>
                  {calendarConfig.tileConfig.length > 0 &&
                    calendarConfig.tileConfig[index].map(tileItem => {
                      return (
                        <CalendarTile
                          width={columnWidth}
                          isReserved={tileItem.isReserved}
                          onReserve={onDrop}
                          key={tileItem.key}
                          id={tileItem.key ?? crypto.randomUUID()}
                        >
                          {tileItem.children}
                        </CalendarTile>
                      );
                    })}
                </>
              </ColoredTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {!isMobile && options && showOptionPicker && (
        <OptionPicker title={optionPickerTitle} items={options} />
      )}
    </Box>
  );
};
