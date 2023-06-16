import { styled, TableCell, tableCellClasses } from '@mui/material';

export const ColoredTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    minWidth: 0,
  },
  [`&.${tableCellClasses.body}`]: {
    position: 'relative',
  },
  [`&.${tableCellClasses.body}:hover`]: {
    cursor: 'pointer',
  },
}));
