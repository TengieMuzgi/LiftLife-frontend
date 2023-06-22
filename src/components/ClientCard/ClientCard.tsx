import React, { useContext } from 'react';
import { UserProps } from '../ProfileOverview/ProfileOverview';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Button } from '../Button';
import { Send } from '@mui/icons-material';
import { AppContext } from '../../App';

type ClientCardProps = Omit<UserProps, 'id' | 'planType' | 'accountType'>;

export const ClientCard = (props: ClientCardProps) => {
  const { showSnackbar } = useContext(AppContext);
  return (
    <Card
      elevation={3}
      sx={{ flexBasis: { mobile: '100%', desktop: '30%' }, m: 3, borderRadius: '45px' }}
    >
      <CardContent sx={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
        <Box>
          <Avatar
            src={props.avatar}
            variant="square"
            sx={{
              bgcolor: 'primary.main',
              width: { mobile: '10vh', desktop: '7vw' },
              height: { mobile: '10vh', desktop: '7vw' },
              borderRadius: '25px',
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="body1" fontWeight={600}>
            {props.firstName + ' ' + props.lastName}
          </Typography>
          <Typography variant="body1">Member since: {props.registerDate}</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="center">Age</TableCell>
                  <TableCell align="center">Weight</TableCell>
                  <TableCell align="center">Height</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="center">{props.age}</TableCell>
                  <TableCell align="center">{props.weight + ' kg'}</TableCell>
                  <TableCell align="center">{props.height + ' cm'}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            type="button"
            variant="outlined"
            icon={<Send />}
            onClick={() => showSnackbar('Coming soon!', 'info')}
          >
            Chat
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
