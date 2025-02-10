import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import { chatApi } from '../api/chatApi';

const LoginContainer = styled(Container)({
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const LoginForm = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  maxWidth: 400,
  width: '100%',
}));

interface LoginProps {
  onLogin: (userId: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    try {
      const user = await chatApi.createUser(username);
      onLogin(user.id);
    } catch (error) {
      setError('ユーザー登録に失敗しました。もう一度お試しください。');
      console.error('Login failed:', error);
    }
  };

  return (
    <LoginContainer>
      <LoginForm elevation={3}>
        <Typography variant="h5" align="center" gutterBottom>
          AIチャットボット
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="ユーザー名"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={!!error}
              helperText={error}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={!username.trim()}
            >
              ログイン
            </Button>
          </Box>
        </form>
      </LoginForm>
    </LoginContainer>
  );
}; 