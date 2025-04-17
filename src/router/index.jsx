import { createBrowserRouter } from 'react-router-dom'
import App from '@/pages/Home/App'
import Game from '@/pages/Game'
import Error from '@/pages/404'
import AppLayout from '@/layout'
import Counter from '@/pages/Counter'
import Channel from '@/pages/Channel'
import Article from '@/pages/Article'
import ArticleDetail from '@/pages/Article/ArticleDetail'
import Login from '@/pages/Login'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true, // 默认子路由
        element: <App />,
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
])

export default routes
