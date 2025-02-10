import React from 'react';
import { Box, Paper, Typography, styled } from '@mui/material';
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
  '&.bot': {
    backgroundColor: theme.palette.grey[100],
  },
  '&.user': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <MessageContainer className={message.isBot ? 'bot' : 'user'}>
      <MessageBubble className={message.isBot ? 'bot' : 'user'} elevation={1}>
        <Typography variant="body1">{message.content}</Typography>
      </MessageBubble>
    </MessageContainer>
  );
}; 