import { BrowserRouter, Routes, Route, createBrowserRouter } from 'react-router-dom'
import App from '../pages/home/App.jsx'
import Game from '../pages/game/index.jsx'
import Error from '../pages/404/index.jsx'
import Layout from '../layout/index.jsx'
import Counter from '../pages/counter/index.jsx'
import Channel from '../pages/channel/index.jsx'
import Article from '@/pages/article'
import ArticleDetail from '@/pages/article/ArticleDetail'

// const routes = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<App />} />
//         <Route path="/game" element={<Game />} />
//       </Routes>
//     </BrowserRouter>
//   )
// }

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
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
])

export default routes
