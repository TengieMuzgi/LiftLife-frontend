import { styled, TableCell, tableCellClasses } from '@mui/material';

export const ColoredTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    minWidth: 0,
  },
  [`&.${tableCellClasses.body}`]: {
    textOverflow: 'ellipsis',
    wordWrap: 'break-word',
    overflow: 'hidden',
    maxHeight: 2.86,
  },
}));
