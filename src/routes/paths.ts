// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';
const ROOTS_ADMIN = '/admin';
const ROOTS_COMPANY = ''; // '/integrador'
const ROOTS_CLIENT = '/painel-cliente'; // '/integrador'
// ----------------------------------------------------------------------

export const PATH_PAGE = {
  home: '/home',
  products: '/produtos',
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
  components: '/components'
};
export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify')
};


export const PATH_APP = {
  login: '/acesso',
  admin: {
    login: '/admin/login',
    home: '/admin/home',
    company: (id: string) => `/company/${id}`
  },
  user: {
    register: '/registrar'
  },
  company: {
    consult: '/company/consult'
  }
};

export const PATH_ADMIN = {
  root: ROOTS_ADMIN,
  general: {
    login: path(ROOTS_ADMIN, '/login'),
    recovery: path(ROOTS_ADMIN, '/recuperar-senha'),
    home: path(ROOTS_ADMIN, '/home'),
    profile: path(ROOTS_ADMIN, '/perfil'),
    management: {
      company: path(ROOTS_ADMIN, '/empresa'),
      companies: path(ROOTS_ADMIN, '/empresas'),
      registerCompanies: path(ROOTS_ADMIN, '/empresas/nova-empresa'),
      groups: path(ROOTS_ADMIN, '/grupos-permissao')
    },
    administrative: {
      users: path(ROOTS_ADMIN, '/usuarios'),
      registerUsers: path(ROOTS_ADMIN, '/usuarios/novo'),
      registerGroup: path(ROOTS_ADMIN, '/grupos-permissao/novo'),
      groups: path(ROOTS_ADMIN, '/grupos-permissao')
    }
  }
};

export const PATH_COMPANY = {
  root: ROOTS_COMPANY,
  general: {
    login: '/acesso',
    home: '/home',
    profile: path(ROOTS_COMPANY, '/perfil'),
    management: {
      client: path(ROOTS_COMPANY, '/cliente'),
      clients: path(ROOTS_COMPANY, '/clientes'),
      registerclient: path(ROOTS_COMPANY, '/clientes/novo'),
      groups: path(ROOTS_COMPANY, '/grupos-permissao')
    },
    administrative: {
      users: path(ROOTS_COMPANY, '/usuarios'),
      registerUsers: path(ROOTS_COMPANY, '/usuarios/novo'),
      registerGroup: path(ROOTS_COMPANY, '/grupos-permissao/novo'),
      groups: path(ROOTS_COMPANY, '/grupos-permissao')
    }
  }
};

export const PATH_CLIENT = {
  root: ROOTS_CLIENT,
  general: {
    login: '/acesso',
    home: '/home',
    profile: path(ROOTS_CLIENT, '/perfil'),
    management: {
      client: path(ROOTS_CLIENT, '/cliente'),
      clients: path(ROOTS_CLIENT, '/clientes'),
      registerclient: path(ROOTS_CLIENT, '/clientes/novo'),
      groups: path(ROOTS_CLIENT, '/grupos-permissao')
    },
    administrative: {
      users: path(ROOTS_CLIENT, '/usuarios'),
      registerUsers: path(ROOTS_CLIENT, '/usuarios/novo'),
      registerGroup: path(ROOTS_CLIENT, '/grupos-permissao/novo'),
      groups: path(ROOTS_CLIENT, '/grupos-permissao')
    }
  }
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    register: path(ROOTS_DASHBOARD, '/register'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    booking: path(ROOTS_DASHBOARD, '/booking')
  },
  license: path(ROOTS_DASHBOARD, '/license'),
  whatsapp: path(ROOTS_DASHBOARD, '/whatsapp'),
  support: path(ROOTS_DASHBOARD, '/support'),
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    newUser: path(ROOTS_DASHBOARD, '/user/new'),
    editById: path(ROOTS_DASHBOARD, '/user/reece-chung/edit'),
    account: path(ROOTS_DASHBOARD, '/user/account')
  },
  registers: {
    root: path(ROOTS_DASHBOARD, '/register'),
    companies: path(ROOTS_DASHBOARD, '/register/companies'),
    rulesGroup: path(ROOTS_DASHBOARD, '/register/custom-rules/rules-group'),
    newRulesGroup: path(ROOTS_DASHBOARD, '/register/custom-rules/rules-group/new'),
    rules: path(ROOTS_DASHBOARD, '/register/custom-rules/rules'),
    newRules: path(ROOTS_DASHBOARD, '/register/custom-rules/rules/new'),
    products: path(ROOTS_DASHBOARD, '/register/products'),
    newProduct: path(ROOTS_DASHBOARD, '/register/products/new'),
    company: path(ROOTS_DASHBOARD, '/register/company/:name'),
    newCompany: path(ROOTS_DASHBOARD, '/register/company/new'),
    editById: path(ROOTS_DASHBOARD, '/register/company/reece-chung/edit')
  },
  taxBase: {
    root: path(ROOTS_DASHBOARD, '/tax-base-reduction'),
    attachmentV: path(ROOTS_DASHBOARD, '/tax-base-reduction/attachment-v'),
    protocolICMS: path(ROOTS_DASHBOARD, '/tax-base-reduction/protocol-icms'),
    newProtocolICMS: path(ROOTS_DASHBOARD, '/tax-base-reduction/protocol-icms/new')
  },
  taxSubstitute: {
    root: path(ROOTS_DASHBOARD, '/tax-substitute'),
    segments: path(ROOTS_DASHBOARD, '/tax-substitute/segments'),
    newSegments: path(ROOTS_DASHBOARD, '/tax-substitute/segments/new'),
    attachmentX: path(ROOTS_DASHBOARD, '/tax-substitute/attachment-x'),
    newAttachmentX: path(ROOTS_DASHBOARD, '/tax-substitute/attachment-x/new'),
    gatekeeper: path(ROOTS_DASHBOARD, '/tax-substitute/gatekeeper-195'),
    newGatekeeper: path(ROOTS_DASHBOARD, '/tax-substitute/gatekeeper-195/new')
  },
  tables: {
    root: path(ROOTS_DASHBOARD, '/tables'),
    tableStates: path(ROOTS_DASHBOARD, '/tables/tables-general/table-states'),
    tableNCM: path(ROOTS_DASHBOARD, '/tables/tables-general/table-ncm'),
    tableCSOSN: path(ROOTS_DASHBOARD, '/tables/tables-general/table-csosn-cts'),
    tableUpdate: path(ROOTS_DASHBOARD, '/tables/tables-update')
  },
  resources: {
    root: path(ROOTS_DASHBOARD, '/resources'),
    importer: path(ROOTS_DASHBOARD, '/resources/importer'),
    analysisICMS: path(ROOTS_DASHBOARD, '/resources/analysis-icms'),
    viewerDanfe: path(ROOTS_DASHBOARD, '/resources/viewer-danfe')
  },
  eCommerce: {
    root: path(ROOTS_DASHBOARD, '/register'),
    shop: path(ROOTS_DASHBOARD, '/register/companies'),
    product: path(ROOTS_DASHBOARD, '/register/tables-general/:name'),
    productById: path(ROOTS_DASHBOARD, '/register/tables-general/table-states'),
    list: path(ROOTS_DASHBOARD, '/register/tables-update'),
    newProduct: path(ROOTS_DASHBOARD, '/register/custom-rules'),
    editById: path(ROOTS_DASHBOARD, '/register/products'),
    checkout: path(ROOTS_DASHBOARD, '/register/checkout'),
    invoice: path(ROOTS_DASHBOARD, '/register/invoice')
  }
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
export const PATH_SUPPORT =
  'https://api.whatsapp.com/send?phone=55999999999999&text=Ol%C3%A1!%20Gostaria%20de%20um%20suporte%2C%20por%20favor.';
