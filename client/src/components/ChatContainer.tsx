import React, { useEffect, useRef, useState } from 'react';
import { Box, Paper, Typography, styled } from '@mui/material';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { chatApi, Message } from '../api/chatApi';

const Container = styled(Paper)(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.default,
}));

const Header = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

const MessagesContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(2),
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
}));

interface ChatContainerProps {
  userId: string;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({ userId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
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
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <Container elevation={3}>
      <Header>
        <Typography variant="h6">AI チャットボット</Typography>
      </Header>
      <MessagesContainer>
        {messages.map((message) => (
          <ChatMessage key={message._id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </MessagesContainer>
      <ChatInput onSendMessage={handleSendMessage} />
    </Container>
  );
}; 