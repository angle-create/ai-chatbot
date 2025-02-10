import React from 'react';
import { Box, Paper, Typography, styled, useTheme, Avatar } from '@mui/material';
import { AutoAwesome } from '@mui/icons-material';
import { Message } from '../api/chatApi';

const MessageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  marginBottom: theme.spacing(3),
  gap: theme.spacing(2),
  padding: theme.spacing(0, 2),
  '&.user': {
    justifyContent: 'flex-end',
  },
}));

const MessageContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '70%',
}));

const MessageBubble = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 16,
  backgroundColor: theme.palette.background.paper,
  position: 'relative',
  '&.user': {
    backgroundColor: 'rgba(66, 133, 244, 0.08)', // Google Blueの透明バージョン
    '&::before': {
      content: '""',
      position: 'absolute',
      right: -8,
      top: 16,
      borderStyle: 'solid',
      borderWidth: '8px 0 8px 8px',
      borderColor: `transparent transparent transparent rgba(66, 133, 244, 0.08)`,
    },
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 32,
  height: 32,
  backgroundColor: 'transparent',
  border: `1.5px solid ${theme.palette.primary.main}`,
  color: theme.palette.primary.main,
  padding: 5,
}));

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const theme = useTheme();

  return (
    <MessageContainer className={message.is_bot ? 'bot' : 'user'}>
      {message.is_bot && (
        <StyledAvatar>
          <AutoAwesome sx={{ fontSize: 18 }} />
        </StyledAvatar>
      )}
      <MessageContent>
        <MessageBubble className={message.is_bot ? 'bot' : 'user'} elevation={0}>
          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.6,
              letterSpacing: 0.15,
              '& code': {
                backgroundColor: theme.palette.background.default,
                padding: '2px 6px',
                borderRadius: 4,
                fontFamily: 'Roboto Mono, monospace',
              },
            }}
          >
            {message.content}
          </Typography>
        </MessageBubble>
      </MessageContent>
    </MessageContainer>
  );
}; 