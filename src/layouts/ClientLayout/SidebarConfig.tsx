// routes
import { PATH_ADMIN, PATH_CLIENT, PATH_COMPANY, PATH_DASHBOARD } from '../../routes/paths';
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
  // {
  //   subheader: 'GESTÃO',
  //   items: [
  //     {
  //       title: 'cadastros',
  //       path: PATH_DASHBOARD.registers.root,
  //       icon: ICONS.register,
  //       children: [{ title: 'Clientes', path: PATH_COMPANY.general.management.clients }]
  //     }
  //   ]
  // },
  {
    subheader: 'ADMINSITRATIVO',
    items: [
      {
        title: 'Usuários',
        path: PATH_DASHBOARD.registers.root,
        icon: ICONS.register,
        children: [
          { title: 'Grupo Permissões', path: PATH_CLIENT.general.management.groups },
          { title: 'Usuários', path: PATH_CLIENT.general.administrative.users }
        ]
      }
    ]
  }
];

export default sidebarConfig;
