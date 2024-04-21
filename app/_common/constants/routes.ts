export const ROUTES = {
  home: '/',
  login: '/auth/login',
  register: '/auth/register',
  forgotPassword: '/auth/forgot-password',

  admin: '/admin',
  users() {
    return this.admin + '/users';
  },
  roles() {
    return this.admin + '/roles';
  },
  rolesDetails() {
    return this.roles() + '/details';
  },
};
