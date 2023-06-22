import { Avatar, Box, Grid, IconButton, SxProps, Typography } from '@mui/material';
import React, { useContext, useRef } from 'react';
import { AppContext } from '../../App';
import {
  desktopAvatarStyles,
  desktopBoxStyles,
  mobileAvatarStyles,
  mobileBoxStyles,
  profileInfoStyles,
} from './ProfileOverview.styles';
import type { UserProps } from '../../constants/user';
import axios, { AxiosError } from 'axios';
import { getCookie } from 'typescript-cookie';

export const ProfileOverview = ({
  avatar,
  firstName,
  lastName,
  planType,
  accountType,
  registerDate,
}: UserProps) => {
  const { isMobile, showSnackbar } = useContext(AppContext);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const avatarSx: SxProps = isMobile ? mobileAvatarStyles : desktopAvatarStyles;

  const containerSx: SxProps = isMobile ? mobileBoxStyles : desktopBoxStyles;

  const handlePhotoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('image', file);
        const response = await axios.post(
          'http://localhost:8081/api/user/picture/insert',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${getCookie('userToken')}`,
            },
          }
        );

        if (response.status === 200) {
          showSnackbar('Photo uploaded', 'success');
        } else {
          showSnackbar(`Something unexpected happened! ${response.status}`, 'error');
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          showSnackbar(error.message, 'error');
        }
      }
    }
  };

  const openFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Grid item sx={{ width: '100%' }}>
      <Box sx={containerSx}>
        {avatar ? (
          <IconButton onClick={openFilePicker}>
            <Avatar src={avatar} sx={avatarSx}></Avatar>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              hidden
              onChange={handlePhotoChange}
            />
          </IconButton>
        ) : (
          <IconButton onClick={openFilePicker}>
            <Avatar sx={avatarSx}>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                hidden
                onChange={handlePhotoChange}
              />
            </Avatar>
          </IconButton>
        )}
        <Box sx={profileInfoStyles}>
          <Typography variant="h4">{firstName + ' ' + lastName}</Typography>
          <Typography variant="body1">Member since: {registerDate}</Typography>
          {accountType === 'CLIENT' ? (
            <Typography variant="body1">Plan: {planType}</Typography>
          ) : (
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              Personal Coach
            </Typography>
          )}
        </Box>
      </Box>
    </Grid>
  );
};
export { UserProps };
