import React from 'react';
import { Box, Paper, Typography, styled, useTheme } from '@mui/material';
import { Message } from '../api/chatApi';

const MessageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  marginBottom: theme.spacing(2),
  '&.bot': {
    justifyContent: 'flex-start',
  },
  '&.user': {
    justifyContent: 'flex-end',
  },
}));

const MessageBubble = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  maxWidth: '70%',
  borderRadius: 16,
  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  transition: 'all 0.2s ease-in-out',
  '&.bot': {
    backgroundColor: theme.palette.background.paper,
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    '&:hover': {
      transform: 'translateX(2px)',
    },
  },
  '&.user': {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    borderRight: `4px solid ${theme.palette.secondary.main}`,
    '&:hover': {
      transform: 'translateX(-2px)',
    },
  },
}));

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const theme = useTheme();

  return (
    <MessageContainer className={message.is_bot ? 'bot' : 'user'}>
      <MessageBubble className={message.is_bot ? 'bot' : 'user'} elevation={2}>
        <Typography variant="body1" sx={{ 
          lineHeight: 1.6,
          '& code': {
            backgroundColor: theme.palette.background.default,
            padding: '2px 4px',
            borderRadius: 4,
          }
        }}>
          {message.content}
        </Typography>
      </MessageBubble>
    </MessageContainer>
  );
}; 