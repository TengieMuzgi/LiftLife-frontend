import { CalendarTileConfigType } from './CalendarTile/CalendarTile.constants';
import { OptionPickerItemProps } from './OptionPicker/OptionPickerItem';

export const DUMMY_WEEKDAYS = ['pon.', 'wt.', 'śr.', 'czw.', 'pt.', 'sob.', 'nie.'];

export const HOURS = [
  '00:00',
  '01:00',
  '02:00',
  '03:00',
  '04:00',
  '05:00',
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
];

export const DndItemTypes = {
  OPTION_PICKER_ITEM: 'OptionPickerItem',
};

export type CalendarConfigType = {
  horizontalDescriptors: string[];
  verticalDescriptors: string[];
  tileConfig: Array<Array<CalendarTileConfigType>>;
};

export const calendarConfig: CalendarConfigType = {
  horizontalDescriptors: DUMMY_WEEKDAYS,
  verticalDescriptors: HOURS,
  tileConfig: [],
};

export const DUMMY_OPTIONLIST: Array<OptionPickerItemProps> = [
  { children: 'a', id: 'a' },
  { children: 'b', id: 'b' },
];
