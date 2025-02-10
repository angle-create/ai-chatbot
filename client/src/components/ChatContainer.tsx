import React, { useEffect, useRef, useState } from 'react';
import { Box, Paper, styled, Alert, Snackbar, useTheme } from '@mui/material';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { chatApi, Message } from '../api/chatApi';
import { AutoAwesome } from '@mui/icons-material';

const Container = styled(Paper)(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.default,
  alignItems: 'center',
}));

const Header = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  alignItems: 'center',
  width: '100%',
}));

const MessagesContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(2),
  paddingBottom: '15px',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  width: '70%',
  margin: '0 auto',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100px',
    background: 'linear-gradient(to bottom, transparent 20%, rgba(32, 33, 36, 0.8))',
    pointerEvents: 'none',
    backdropFilter: 'blur(4px)',
    borderRadius: theme.shape.borderRadius,
  }
}));

interface ChatContainerProps {
  userId: string;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({ userId }) => {
  const theme = useTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        const history = await chatApi.getChatHistory(userId);
        setMessages(history);
      } catch (error) {
        console.error('Failed to load chat history:', error);
        setError('チャット履歴の読み込みに失敗しました。');
      }
    };

    loadChatHistory();
  }, [userId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    try {
      const response = await chatApi.sendMessage(userId, content);
      setMessages(prev => [...prev, response.userMessage, response.botMessage]);
      setError(null);
    } catch (error) {
      console.error('Failed to send message:', error);
      setError('メッセージの送信に失敗しました。');
    }
  };

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <Container elevation={3}>
      <Header>
        <AutoAwesome sx={{ 
          color: theme.palette.primary.main,
          fontSize: 22,
        }} />
      </Header>
      <MessagesContainer>
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </MessagesContainer>
      <ChatInput onSendMessage={handleSendMessage} />
      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseError} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
}; 