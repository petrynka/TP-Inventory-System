import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Orders from './pages/Orders/Orders';
import OrderDetail from './pages/Orders/OrderDetail';
import Products from './pages/Products/Products';
import NotFound from './pages/NotFound/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/orders" replace />
      },
      {
        path: 'orders',
        element: <Orders />
      },
      {
        path: 'orders/:id',
        element: <OrderDetail />
      },
      {
        path: 'products',
        element: <Products />
      },
    ]
  },
   {
        path: '*',
        element: <NotFound />
    }
]);