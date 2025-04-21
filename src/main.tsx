import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import routes from './router'
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store, persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'

import '@ant-design/v5-patch-for-react-19'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={routes} />
      </PersistGate>
    </Provider>
  </StrictMode>
)
