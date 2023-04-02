import React from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { CalendarConfigType } from './Calendar.constants';
import { ColoredTableRow } from './Calendar.styles';
import { OptionPicker } from './OptionPicker/OptionPicker';
import { CalendarTile } from './CalendarTile/CalendarTile';
import { OptionPickerItemProps } from './OptionPicker/OptionPickerItem';

type CalendarProps = {
  sx?: React.CSSProperties;
  /**
   * Config object that determines the components' behavior
   */
  calendarConfig: CalendarConfigType;
  /**
   *
   * @param id id of `CalendarTile` that fired drop event
   * @returns
   */
  onDrop?: (id: string) => void;
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

export const Calendar = (props: CalendarProps) => {
  const {
    sx,
    onDrop,
    options,
    showOptionPicker,
    optionPickerTitle,
    calendarConfig: config,
  } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('desktop'));
  const columnWidth = 100 / 8 + '%';

  return (
    <Box display="flex">
      <TableContainer sx={sx} component={Paper}>
        <Table size="small">
          <TableHead>
            <ColoredTableRow>
              <CalendarTile id="placeholder" width={columnWidth}></CalendarTile>
              {config.horizontalDescriptors.map((node, i) => (
                <CalendarTile id={i.toString()} key={i.toString()} width={columnWidth}>
                  <Box>{node}</Box>
                </CalendarTile>
              ))}
            </ColoredTableRow>
          </TableHead>
          <TableBody>
            {config.verticalDescriptors.map((descriptor, index) => (
              <ColoredTableRow key={`${descriptor}-${index}`}>
                <>
                  <CalendarTile
                    width={columnWidth}
                    component="th"
                    scope="row"
                    key={descriptor}
                    id={descriptor}
                  >
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
                  {config.tileConfig.length > 0 &&
                    config.tileConfig[index].map(tileItem => {
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
