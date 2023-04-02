import { styled, TableRow } from '@mui/material';

export const ColoredTableRow = styled(TableRow)(({ theme }) => ({
  maxHeight: 72,
  '&:nth-of-type(odd)': {
    border: 1,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
