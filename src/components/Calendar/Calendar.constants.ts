import type { CalendarConfigType } from './Calendar.types';
import { OptionPickerItemProps } from './OptionPicker/OptionPickerItem';

export const DUMMY_WEEKDAYS = ['Mon.', 'Tue.', 'Wed.', 'Thur.', 'Fri.', 'Sat.', 'Sun.'];

export const DndItemTypes = {
  OPTION_PICKER_ITEM: 'OptionPickerItem',
};

/**
 * The most important config to Calendar component.
 * We should verify its structure and discuss with backend
 */
export const calendarConfig: CalendarConfigType = {
  columnDescriptors: DUMMY_WEEKDAYS,
  rowDescriptors: ['Morning', 'Afternoon', 'Evening'],
  tileConfig: [],
};

export const DUMMY_OPTIONLIST: Array<OptionPickerItemProps> = [
  { children: 'a', id: 'a' },
  { children: 'b', id: 'b' },
];
