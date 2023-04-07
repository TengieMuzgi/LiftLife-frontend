import { List, ListSubheader, Paper } from '@mui/material';
import React from 'react';
import { OptionPickerItem, OptionPickerItemProps } from './OptionPickerItem';

type OptionPickerPropsType = {
  items: Array<OptionPickerItemProps>;
  title?: string;
};

export const OptionPicker = ({ items, title }: OptionPickerPropsType) => {
  return (
    <Paper>
      <List
        sx={{ margin: 2 }}
        subheader={
          title ? (
            <ListSubheader component="div" id="nested-list-subheader">
              Option list
            </ListSubheader>
          ) : undefined
        }
      >
        {items.map(listItem => (
          <OptionPickerItem id={listItem.id} key={listItem.id}>
            {listItem.children}
          </OptionPickerItem>
        ))}
      </List>
    </Paper>
  );
};
