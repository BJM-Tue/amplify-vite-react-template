import { lazy, LazyExoticComponent, Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { DASHBOARD_PATH } from './path';

const PageLoader =
  (Component: LazyExoticComponent<(props: any) => JSX.Element>) => (props: any) => {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Component {...props} />
      </Suspense>
    );
  };

const Router = () => {
  return useRoutes([
    {
      path: DASHBOARD_PATH.ROOT,
      children: [
        { path: '', element: <Navigate to={DASHBOARD_PATH.CHAT.URL} replace /> },
        { path: DASHBOARD_PATH.CHAT.PATH, element: <Chat /> },
        { path: `${DASHBOARD_PATH.CHAT.PATH}/:_id`, element: <Chat /> },
      ],
    },
  ]);
};

const Chat = PageLoader(lazy(() => import('../pages/Chat.page')));

export default Router;
