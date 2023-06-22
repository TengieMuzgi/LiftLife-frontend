import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import { Button } from '../../../components/Button';
import axios, { AxiosError } from 'axios';
import { getCookie } from 'typescript-cookie';
import clipboardCopy from 'clipboard-copy';
import { Add, ContentCopy } from '@mui/icons-material';
import { ContainerStyles } from './TokenGenerator.styles';
import { AppContext } from '../../../App';


export const TokenGenerator = () => {
  const [token, setToken] = useState('');
  const {showSnackbar} = useContext(AppContext);

  const generateToken = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/user/token/generate', {
        headers: { Authorization: `Bearer ${getCookie('userToken')}` },
      });
      if (response.status === 200) {
        setToken(response.data);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        showSnackbar(error.message, 'error');
      }
    }
  };

  const handleCopy = () => {
    clipboardCopy(token)
      .then(() => {
        showSnackbar('Token copied to clipboard', 'success');
      })
      .catch(error => {
        showSnackbar('Failed to copy token to clipboard', 'error');
      });
  };

  return (
    <Box sx={ContainerStyles}>
      <Button type="button" onClick={generateToken} icon={<Add/>}>
        Generate invitation token
      </Button>
      {token !== '' && (
        <TextField
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleCopy}>
                  <ContentCopy sx={{ color: 'primary.main' }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          value={token}
          helperText="Your token"
          sx={{ height: '50px', px: 5 }}
        />
      )}
    </Box>
  );
};
