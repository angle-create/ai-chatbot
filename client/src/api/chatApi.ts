import axios, { AxiosError } from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export interface Message {
  id: string;
  user_id: string;
  content: string;
  is_bot: boolean;
  created_at: string;
}

export interface ChatResponse {
  userMessage: Message;
  botMessage: Message;
}

const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message: string; error: string }>;
    if (axiosError.response?.data?.message) {
      throw new Error(axiosError.response.data.message);
    }
  }
  throw error;
};

export const chatApi = {
  sendMessage: async (userId: string, content: string): Promise<ChatResponse> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/chat`, { userId, content });
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  getChatHistory: async (userId: string): Promise<Message[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/chat/${userId}`);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  createUser: async (username: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users`, { username });
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  getUser: async (username: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${username}`);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },
}; 