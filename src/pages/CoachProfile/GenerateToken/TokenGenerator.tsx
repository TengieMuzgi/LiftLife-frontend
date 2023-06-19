import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Button } from '../../../components/Button';
import axios, { AxiosError } from 'axios';
import { getCookie } from 'typescript-cookie';
import clipboardCopy from 'clipboard-copy';
import { ContentCopy } from '@mui/icons-material';

type TokenGeneratorProps = {
  showSnackbar: (message: string, severity: 'success' | 'error') => void;
};

export const TokenGenerator = ({ showSnackbar }: TokenGeneratorProps) => {
  const [token, setToken] = useState('');
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
      .catch((error) => {
        showSnackbar('Failed to copy token to clipboard', 'error');
        console.error('Error copying token to clipboard:', error);
      });
  };

  return (
    <Box sx={{pt:{mobile:0,desktop:8}, display: 'flex', flexDirection: {mobile:'column',desktop:'row'}, alignItems: 'center', gap:3 }}>
      <Button type="button" onClick={generateToken}>
        Generate register token
      </Button>
      {token !== '' && (
         <TextField
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleCopy}>
                  <ContentCopy sx={{ color:'primary.main'}} />
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
