import { Outlet } from 'react-router-dom';
import Header from './components/header/header';
import { Suspense } from 'react';

const Layout = () => (
  <>
    <Header />
    <Suspense fallback={<div>Loader </div>}>
      <Outlet />
    </Suspense>
  </>
);

export default Layout;
