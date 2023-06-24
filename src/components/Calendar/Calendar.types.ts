import { CalendarTileConfigType } from './CalendarTile/CalendarTile.types';

export type CalendarConfigType = {
  rowDescriptors: string[];
  columnDescriptors: string[];
  tileConfig?: Array<Array<CalendarTileConfigType>>;
};
