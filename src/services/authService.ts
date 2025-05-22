
'use client';

import axiosClient from './axiosClient';
import useAuthStore from '@/store/useAuthStore';

// Types
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  password: string;
}

export interface ResendVerificationData {
  email: string;
}

// API functions
export const login = async (credentials: LoginCredentials) => {
  const { email, password, rememberMe } = credentials;

  // Remove rememberMe from the data sent to the API
  const response = await axiosClient.post('/api/auth/login', { email, password });

  // Store token and user data in Zustand store
  if (response.data && response.data.token) {
    const token = response.data.token;

    // Get user data
    const userResponse = await axiosClient.get('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // Set auth in store with persistence option
    useAuthStore.getState().setAuth(token, userResponse.data.data);

    // Store token in localStorage or sessionStorage based on remember me
    if (rememberMe) {
      localStorage.setItem('token', token);
    } else {
      sessionStorage.setItem('token', token);
    }
  }

  return response.data;
};

export const register = async (userData: RegisterData) => {
  const response = await axiosClient.post('/api/auth/register', userData);
  return response.data;
};

export const logout = () => {
  useAuthStore.getState().logout();
};

export const getCurrentUser = async () => {
  const response = await axiosClient.get('/api/auth/me');
  return response.data;
};

export const forgotPassword = async (data: ForgotPasswordData) => {
  const response = await axiosClient.post('/api/auth/forgotpassword', data);
  return response.data;
};

export const resetPassword = async (token: string, data: ResetPasswordData) => {
  const response = await axiosClient.put(`/api/auth/resetpassword/${token}`, data);
  return response.data;
};

export const verifyEmail = async (token: string) => {
  const response = await axiosClient.get(`/api/auth/verify-email/${token}`);

  // Store token in Zustand store if verification successful
  if (response.data && response.data.token) {
    const token = response.data.token;

    // Get user data
    const userResponse = await axiosClient.get('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    // Set auth in store
    useAuthStore.getState().setAuth(token, userResponse.data.data);
  }

  return response.data;
};

export const resendVerification = async (data: ResendVerificationData) => {
  const response = await axiosClient.post('/api/auth/resend-verification', data);
  return response.data;
};

// Export all API functions directly




