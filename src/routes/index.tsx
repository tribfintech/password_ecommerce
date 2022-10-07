import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import AdminGuard from 'guards/AdminGuard';
import HomeAdmin from 'screens/admin/home';
import SignIn from 'screens/integrator/unauthenticated/login';
import Register from 'screens/integrator/unauthenticated/register';
import AdminLayout from 'layouts/AdminLayout';
import GuestAdmin from 'guards/GuestAdmin';
import AdminProfile from 'screens/admin/profile';
import ListUsers from 'screens/admin/users/list';
import GroupsList from 'screens/admin/groups/list';
import NewGroup from 'screens/admin/groups/new';
import NewUser from 'screens/admin/users/new';
import GuestCompany from 'guards/GuestCompany';
import CompanyGuard from 'guards/CompanyGuard';
import HomeCompany from 'screens/integrator/home';
import CompanyLayout from 'layouts/CompanyLayout';
import CompanyListUsers from 'screens/integrator/users/list';
import CompanyGroupsList from 'screens/integrator/groups/list';
import CompanyClientsList from 'screens/integrator/clients/list';
import CompanyNewClient from 'screens/integrator/clients/new';
import CompanyNewGroup from 'screens/integrator/groups/new';
import CompanyNewUser from 'screens/integrator/users/new';
import IntegratorProfile from 'screens/integrator/profile';
import GuestClient from 'guards/GuestClient';
import SignInClient from 'screens/client/unauthenticated/login';
import ClientGuard from 'guards/ClientGuard';
import HomeClient from 'screens/client/home';
import ClientLayout from 'layouts/ClientLayout';
import ClientGroupsList from 'screens/client/groups/list';
import ClientNewGroup from 'screens/client/groups/new';
import ClientListUsers from 'screens/client/users/list';
import ClientNewUser from 'screens/client/users/new';
import ClientProfile from 'screens/client/profile';
import AdminResetPassword from 'screens/admin/unauthenticated/resetPassword';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
// components
import LoadingScreen from '../components/LoadingScreen';
import { PATH_SUPPORT } from './paths';
import Page404 from '../screens/general/notfound';

// ----------------------------------------------------------------------

const Loadable = (Component: React.ElementType) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed'
            })
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      // Integrador
      path: '/',
      children: [
        {
          path: '/',
          element: (
            <GuestCompany>
              <SignIn />
            </GuestCompany>
          )
        },
        {
          path: 'registrar',
          element: (
            <GuestCompany>
              <Register />
            </GuestCompany>
          )
        }
      ]
    },
    {
      path: '/',
      element: (
        <CompanyGuard>
          <CompanyLayout />
        </CompanyGuard>
      ),
      children: [
        { path: '/', element: <Navigate to="/home" replace /> },
        { path: 'perfil', element: <IntegratorProfile /> },
        { path: 'home', element: <HomeCompany /> },
        { path: 'clientes', element: <CompanyClientsList /> },
        { path: 'clientes/novo', element: <CompanyNewClient /> },
        { path: 'cliente/:id', element: <CompanyNewClient /> },
        { path: 'usuarios', element: <CompanyListUsers /> },
        { path: 'usuarios/novo', element: <CompanyNewUser /> },
        { path: 'usuarios/:id', element: <CompanyNewUser /> },
        { path: 'grupos-permissao', element: <CompanyGroupsList /> },
        { path: 'grupos-permissao/novo', element: <CompanyNewGroup /> },
        { path: 'grupos-permissao/:id', element: <CompanyNewGroup /> },
        { path: '404', element: <Page404 /> }
      ]
    },
    // Administrativo
    {
      path: 'admin',
      children: [
        {
          path: '/',
          element: (
            <GuestAdmin>
              <SignInAdmin />
            </GuestAdmin>
          )
        },
        { path: 'recuperar-senha', element: <AdminResetPassword /> }
      ]
    },

    {
      path: 'admin',
      element: (
        <AdminGuard>
          <AdminLayout />
        </AdminGuard>
      ),
      children: [
        { path: '/', element: <Navigate to="/admin/home" replace /> },
        { path: 'perfil', element: <AdminProfile /> },
        { path: 'home', element: <HomeAdmin /> },
        { path: 'empresas', element: <CompaniesList /> },
        { path: 'empresas/nova-empresa', element: <CompanyAction /> },
        { path: 'empresa/:id', element: <CompanyAction /> },
        { path: 'usuarios', element: <ListUsers /> },
        { path: 'usuarios/novo', element: <NewUser /> },
        { path: 'usuarios/:id', element: <NewUser /> },
        { path: 'grupos-permissao', element: <GroupsList /> },
        { path: 'grupos-permissao/novo', element: <NewGroup /> },
        { path: 'grupos-permissao/:id', element: <NewGroup /> },
        { path: '404', element: <Page404 /> }
      ]
    },

    // Cliente
    {
      path: 'cliente',
      children: [
        {
          path: '/',
          element: (
            <GuestClient>
              <SignInClient />
            </GuestClient>
          )
        }
      ]
    },

    {
      path: 'painel-cliente',
      element: (
        <ClientGuard>
          <ClientLayout />
        </ClientGuard>
      ),
      children: [
        { path: '/', element: <Navigate to="/painel-cliente/home" replace /> },
        { path: 'perfil', element: <ClientProfile /> },
        { path: 'home', element: <HomeClient /> },
        { path: 'empresas', element: <CompaniesList /> },
        { path: 'empresas/nova-empresa', element: <CompanyAction /> },
        { path: 'empresa/:id', element: <CompanyAction /> },
        { path: 'usuarios', element: <ClientListUsers /> },
        { path: 'usuarios/novo', element: <ClientNewUser /> },
        { path: 'usuarios/:id', element: <ClientNewUser /> },
        { path: 'grupos-permissao', element: <ClientGroupsList /> },
        { path: 'grupos-permissao/novo', element: <ClientNewGroup /> },
        { path: 'grupos-permissao/:id', element: <ClientNewGroup /> },
        { path: '404', element: <Page404 /> }
      ]
    },

    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <GeneralApp /> },
        { path: 'analytics', element: <GeneralAnalytics /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" replace /> },

        {
          path: 'app',
          children: [
            { path: '/', element: <Navigate to="/dashboard/app/companies" replace /> },
            { path: 'companies', element: <CompaniesList /> },
            { path: 'custom-rules/rules-group', element: <RulesGroup /> },
            { path: 'custom-rules/rules-group/new', element: <RulesGroupCreate /> },
            { path: 'custom-rules/rules', element: <Rules /> },
            { path: 'custom-rules/rules/new', element: <RulesCreate /> },
            { path: 'products', element: <ProductList /> },
            { path: 'products/new', element: <ProductsCreate /> },
            { path: 'company/new', element: <CompanyCreate /> },
            { path: 'company/:name/edit', element: <CompanyCreate /> }
          ]
        },
        {
          path: 'user',
          children: [
            { path: '/', element: <Navigate to="/dashboard/user/profile" replace /> },
            { path: 'new', element: <UserCreate /> },
            { path: '/:name/edit', element: <UserCreate /> },
            { path: 'account', element: <UserAccount /> }
          ]
        },
        {
          path: 'tax-base-reduction',
          children: [
            {
              path: '/',
              element: <Navigate to="/dashboard/tax-base-reduction/attachment-v" replace />
            },
            { path: 'attachment-v', element: <AttachmentV /> },
            { path: 'protocol-icms', element: <ProtocolICMS /> },
            { path: 'protocol-icms/new', element: <ProtocolICMSCreate /> }
          ]
        },
        {
          path: 'tax-substitute',
          children: [
            { path: '/', element: <Navigate to="/dashboard/tax-substitute/segments" replace /> },
            { path: 'segments', element: <SegmentsList /> },
            { path: 'segments/new', element: <SegmentCreate /> },
            { path: 'attachment-x', element: <AttachmentX /> },
            { path: 'attachment-x/new', element: <AttachmentXCreate /> },
            { path: 'gatekeeper-195', element: <Gatekeeper /> },
            { path: 'gatekeeper-195/new', element: <GatekeeperCreate /> }
          ]
        },
        {
          path: 'tables',
          children: [
            { path: '/', element: <Navigate to="/dashboard/tables" replace /> },
            { path: 'tables-general/table-states', element: <TableStates /> },
            { path: 'tables-general/table-csosn-cts', element: <TableCSOSN /> },
            { path: 'tables-general/table-ncm', element: <TableNCM /> },
            { path: 'tables-update', element: <RulesGroup /> }
          ]
        },
        {
          path: 'resources',
          children: [
            { path: '/', element: <Navigate to="/dashboard/resources/importer" replace /> },
            { path: 'importer', element: <Importer /> },
            { path: 'analysis-icms', element: <AnalyzeICMS /> },
            { path: 'viewer-danfe', element: <DanfeViewer /> }
          ]
        },
        { path: 'license', element: <License /> },
        {
          path: 'whatsapp',
          element: <RedirectSupport url={PATH_SUPPORT} />
        }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

// IMPORT COMPONENTS
// Authentication
const RedirectSupport = Loadable(lazy(() => import('../pages/dashboard/RedirectSupport')));
const SignInAdmin = Loadable(lazy(() => import('../screens/admin/unauthenticated/login')));

const ResetPassword = Loadable(lazy(() => import('../pages/authentication/ResetPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/authentication/VerifyCode')));
// Dashboard
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')));
const GeneralAnalytics = Loadable(lazy(() => import('../pages/dashboard/GeneralAnalytics')));
const RulesGroup = Loadable(lazy(() => import('../pages/dashboard/RulesGroup')));
const RulesGroupCreate = Loadable(lazy(() => import('../pages/dashboard/RulesGroupCreate')));
const Rules = Loadable(lazy(() => import('../pages/dashboard/Rules')));
const RulesCreate = Loadable(lazy(() => import('../pages/dashboard/RulesCreate')));
const ProductsCreate = Loadable(lazy(() => import('../pages/dashboard/ProductsCreate')));

const TableStates = Loadable(lazy(() => import('../pages/dashboard/TableStates')));
const TableCSOSN = Loadable(lazy(() => import('../pages/dashboard/TableCSOSN')));
const TableNCM = Loadable(lazy(() => import('../pages/dashboard/TableNCM')));

const CompanyCreate = Loadable(lazy(() => import('../pages/dashboard/CompanyCreate')));
const ProtocolICMSCreate = Loadable(lazy(() => import('../pages/dashboard/ProtocolICMSCreate')));
const SegmentCreate = Loadable(lazy(() => import('../pages/dashboard/SegmentCreate')));
const License = Loadable(lazy(() => import('../pages/dashboard/License')));
const Importer = Loadable(lazy(() => import('../pages/dashboard/Importer')));
const AnalyzeICMS = Loadable(lazy(() => import('../pages/dashboard/AnalyzeICMS')));
const ProductList = Loadable(lazy(() => import('../pages/dashboard/ProductList')));
const ProtocolICMS = Loadable(lazy(() => import('../pages/dashboard/ProtocolICMS')));
const DanfeViewer = Loadable(lazy(() => import('../pages/dashboard/DanfeViewer')));
const SegmentsList = Loadable(lazy(() => import('../pages/dashboard/SegmentsList')));
const AttachmentV = Loadable(lazy(() => import('../pages/dashboard/AttachmentV')));
const AttachmentX = Loadable(lazy(() => import('../pages/dashboard/AttachmentX')));
const AttachmentXCreate = Loadable(lazy(() => import('../pages/dashboard/AttachmentXCreate')));
const Gatekeeper = Loadable(lazy(() => import('../pages/dashboard/Gatekeeper')));
const GatekeeperCreate = Loadable(lazy(() => import('../pages/dashboard/GatekeeperCreate')));
const CompaniesList = Loadable(lazy(() => import('../screens/admin/companies/list')));
const CompanyAction = Loadable(lazy(() => import('../screens/admin/companies/new')));
const UserAccount = Loadable(lazy(() => import('../pages/dashboard/UserAccount')));
const UserCreate = Loadable(lazy(() => import('../pages/dashboard/UserCreate')));

const Page500 = Loadable(lazy(() => import('../pages/Page500')));
