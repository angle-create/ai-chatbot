import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export interface Message {
  _id: string;
  userId: string;
  content: string;
  isBot: boolean;
  createdAt: string;
}

export interface ChatResponse {
  userMessage: Message;
  botMessage: Message;
}

export const chatApi = {
  sendMessage: async (userId: string, content: string): Promise<ChatResponse> => {
    const response = await axios.post(`${API_BASE_URL}/chat`, { userId, content });
    return response.data;
  },

  getChatHistory: async (userId: string): Promise<Message[]> => {
    const response = await axios.get(`${API_BASE_URL}/chat/${userId}`);
    return response.data;
  },

  createUser: async (username: string) => {
    const response = await axios.post(`${API_BASE_URL}/users`, { username });
    return response.data;
  },

  getUser: async (username: string) => {
    const response = await axios.get(`${API_BASE_URL}/users/${username}`);
    return response.data;
  },
}; 