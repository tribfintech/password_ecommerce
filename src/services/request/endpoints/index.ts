// eslint-disable-next-line import/no-anonymous-default-export
export default {
  administrative: {
    login: '/administrative/login',
    recovery: '/administrative/recovery',
    companiesList: '/administrative/companies',
    registerCompany: '/administrative/company',
    company: '/administrative/company',
    group: '/administrative/group-permission',
    groups: '/administrative/group-permissions',
    permissions: '/administrative/permissions',
    users: '/administrative/users',
    user: '/administrative/user',
    profile: '/administrative/me',
    changeDetails: '/administrative/me',
    changePassword: '/administrative/me/password'
  },
  integrator: {
    registerCompany: '/company',
    login: '/company/login',
    permissions: '/company/permissions',
    users: '/company/users',
    user: '/company/user',
    group: '/company/group-permission',
    groups: '/company/group-permissions',
    clients: '/company/clients',
    client: '/company/clients',
    profile: '/company/me',
    changeDetails: '/company/me',
    changePassword: '/company/me/password'
  },
  client: {
    login: '/client/login',
    permissions: '/client/permissions',
    users: '/client/users',
    user: '/client/user',
    group: '/client/group-permission',
    groups: '/client/group-permissions',
    profile: '/client/me',
    changeDetails: '/client/me',
    changePassword: '/client/me/password'
  },
  login: '/login'
};
