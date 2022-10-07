// routes
import { PATH_ADMIN, PATH_DASHBOARD } from '../../routes/paths';
// components
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  register: getIcon('ic_register'),
  calculator: getIcon('ic_calculator'),
  tax: getIcon('ic_tax'),
  aliquot: getIcon('ic_aliquot'),
  analytics: getIcon('ic_analytics'),
  resources: getIcon('ic_resources'),
  key: getIcon('ic_key'),
  whatsapp: getIcon('ic_whatsapp')
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'Dashboards',
  //   items: [{ title: 'analytics', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics }]
  // },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'GESTÃO',
    items: [
      // MANAGEMENT : CADASTROS
      {
        title: 'cadastros',
        path: PATH_DASHBOARD.registers.root,
        icon: ICONS.register,
        children: [{ title: 'empresas', path: PATH_ADMIN.general.management.companies }]
      }
      // MANAGEMENT : REDUÇÃO DE BASE DE CÁLCULO
      // {
      //   title: 'redução de base de cálculo',
      //   path: PATH_DASHBOARD.taxBase.root,
      //   icon: ICONS.calculator,
      //   children: [
      //     { title: 'anexo v', path: PATH_DASHBOARD.taxBase.attachmentV },
      //     { title: 'protocolo ICMS 41/08', path: PATH_DASHBOARD.taxBase.protocolICMS }
      //   ]
      // },

      // // MANAGEMENT : SUBSTITUTO TRIBUTÁRIO
      // {
      //   title: 'substituto tributário',
      //   path: PATH_DASHBOARD.taxSubstitute.root,
      //   icon: ICONS.tax,
      //   children: [
      //     { title: 'segmentos', path: PATH_DASHBOARD.taxSubstitute.segments },
      //     { title: 'anexo X', path: PATH_DASHBOARD.taxSubstitute.attachmentX },
      //     { title: 'Portária 195', path: PATH_DASHBOARD.taxSubstitute.gatekeeper }
      //   ]
      // },

      // // MANAGEMENT : TABELAS
      // {
      //   title: 'tabelas',
      //   path: PATH_DASHBOARD.tables.root,
      //   icon: ICONS.aliquot,
      //   children: [
      //     { title: 'tabelas gerais', path: PATH_DASHBOARD.tables.tableStates },
      //     { title: 'atualização de tabelas', path: PATH_DASHBOARD.tables.tableUpdate }
      //   ]
      // },

      // // MANAGEMENT : RECURSOS
      // {
      //   title: 'recursos',
      //   path: PATH_DASHBOARD.resources.root,
      //   icon: ICONS.resources,
      //   children: [
      //     { title: 'importador', path: PATH_DASHBOARD.resources.importer },
      //     { title: 'análise de ICMS', path: PATH_DASHBOARD.resources.analysisICMS },
      //     { title: 'Visualizador Danfe', path: PATH_DASHBOARD.resources.viewerDanfe }
      //   ]
      // }
    ]
  },
  {
    subheader: 'ADMINSITRATIVO',
    items: [
      {
        title: 'Usuários',
        path: PATH_DASHBOARD.registers.root,
        icon: ICONS.register,
        children: [
          { title: 'Grupo Permissões', path: PATH_ADMIN.general.management.groups },
          { title: 'Usuários', path: PATH_ADMIN.general.administrative.users }
        ]
      }
    ]
  }
];

export default sidebarConfig;
