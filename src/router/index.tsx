import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from '@/pages/Home/Home';
import Game from '@/pages/Game';
import Error from '@/pages/404';
import AppLayout from '@/layout/index';
import Counter from '@/pages/Counter';
import Channel from '@/pages/Channel';
import Article from '@/pages/Article';
import ArticleDetail from '@/pages/Article/ArticleDetail';
import Login from '@/pages/Login';
import NotFound from '@/pages/Error/NotFound';
import Bill from '@/pages/Mobile/Bill';
import AddBill from '@/pages/Mobile/AddBill';
import MonthBill from '@/pages/Mobile/MonthBill';
import YearBill from '@/pages/Mobile/YearBill';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true, // 默认子路由
        element: <Home />,
      },
      {
        path: 'game',
        element: <Game />,
      },
      {
        path: 'counter',
        element: <Counter />,
      },
      {
        path: 'channel',
        element: <Channel />,
      },
      {
        path: 'article',
        element: <Article />,
      },
      {
        path: 'articleDetail/:id',
        element: <ArticleDetail />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/bill',
    element: <Bill />,
    children: [
      {
        index: true,
        element: <Navigate to="year" replace />
      },
      {
        path: 'year',
        element: <YearBill />,
      },
      {
        path: 'add',
        element: <AddBill />,
      },
      {
        path: 'month',
        element: <MonthBill />,
      },
    ],
  },
]);

export default routes;
