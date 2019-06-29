export const TOKEN_KEY = '';
export const LOGGED_USER = '';

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY);

export const isAdmin = () => {
  const user = localStorage.getItem(LOGGED_USER);

  if (!user) {
    return false;
  }

  return user.is_admin;
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);

/* eslint-disable camelcase */
export const login = ({
  token, name, email, is_student, is_admin, age,
}) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(LOGGED_USER, {
    name,
    email,
    is_student,
    is_admin,
    age,
  });
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(LOGGED_USER);
};
