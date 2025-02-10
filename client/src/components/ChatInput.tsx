import React, { useState } from 'react';
import { Box, TextField, IconButton, styled } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';

const InputContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(2),
  gap: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
}));

interface ChatInputProps {
  onSendMessage: (content: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputContainer>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="メッセージを入力..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          size="small"
        />
        <IconButton
          color="primary"
          type="submit"
          disabled={!message.trim()}
          sx={{ bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' } }}
        >
          <SendIcon />
        </IconButton>
      </InputContainer>
    </form>
  );
}; 