import { BrowserRouter } from 'react-router-dom';
import { useRoutes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import PrivateRoute from './components/private-route/private-route';
import RegistrationForm from './components/register-user/register-user';
import PreLoading from './components/loader/pre-loading';
import Layout from './Layout';
import Quiz from './pages/quiz/quiz';

const Main = lazy(() => import('./pages/main/main'));
const ProductList = lazy(() => import('./pages/subscription-list/subscription-list'));


const AppRoutes = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Main />,
        },
        { path: 'shopping', element: (
           <PrivateRoute>
              <ProductList />
            </PrivateRoute>
        ) },
        { path: 'quiz', element: <Quiz /> },
      ],
    },
    {
      path: 'auth',
      element: (
        <Suspense fallback={<PreLoading />}>
          <RegistrationForm />
        </Suspense>
      ),
    },
  ]);

  return routes;
};

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
