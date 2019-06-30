export const TOKEN_KEY = 'PARK_TOKEN';
export const LOGGED_USER = 'PARK_USER';

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY);

export const isAdmin = () => {
  const user = JSON.parse(localStorage.getItem(LOGGED_USER));

  if (!user) {
    return false;
  }

  return user.is_admin;
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const getUser = () => JSON.parse(localStorage.getItem(LOGGED_USER));

/* eslint-disable camelcase */
export const login = ({ token, user }) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(LOGGED_USER, JSON.stringify(user));

  window.location.reload();
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(LOGGED_USER);

  window.location.reload();
};
