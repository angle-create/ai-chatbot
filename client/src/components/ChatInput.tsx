import React, { useState } from 'react';
import { Box, TextField, IconButton, styled, useTheme } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';

const InputContainer = styled(Box)(({ theme }) => ({
  width: '60%',
  display: 'flex',
  gap: theme.spacing(2),
  marginTop: '-10px',
  paddingBottom: '15px',
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  border: '1px solid rgba(255, 255, 255, 0.2)',
  padding: theme.spacing(2),
}));

const FormWrapper = styled('form')({
  width: '100%',
  display: 'flex',
  gap: '16px',
});

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  width: 40,
  height: 40,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    transform: 'scale(1.05)',
  },
  '&:disabled': {
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
}));

interface ChatInputProps {
  onSendMessage: (content: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const theme = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (message.trim()) {
        onSendMessage(message);
        setMessage('');
      }
    }
  };

  return (
    <InputContainer>
      <FormWrapper onSubmit={handleSubmit}>
        <TextField
          fullWidth
          multiline
          maxRows={4}
          variant="outlined"
          placeholder="メッセージを入力..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: theme.palette.background.default,
              '&:hover': {
                backgroundColor: theme.palette.background.default,
              },
              '&.Mui-focused': {
                backgroundColor: theme.palette.background.default,
              },
              '& fieldset': {
                borderColor: 'transparent',
              },
              '&:hover fieldset': {
                borderColor: 'transparent',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'transparent',
              },
            },
          }}
        />
        <StyledIconButton
          type="submit"
          disabled={!message.trim()}
          size="small"
        >
          <SendIcon />
        </StyledIconButton>
      </FormWrapper>
    </InputContainer>
  );
}; 