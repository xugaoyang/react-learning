import { RouterProvider } from 'react-router-dom';
import routes from './router';
import { useSelector, useDispatch } from 'react-redux';
import { ConfigProvider, theme} from 'antd';
import '@ant-design/v5-patch-for-react-19';
import { zhCN, enUS } from './i18n';

function App() {
  const { defaultLang, defaultTheme } = useSelector((state: any) => state.setting);
  const locale = defaultLang === 'zh_CN' ? zhCN : enUS;
  const antdAlgorithm = defaultTheme === 'light'?theme.defaultAlgorithm:theme.darkAlgorithm
  return (
    <ConfigProvider locale={locale} theme={{
      algorithm: antdAlgorithm,
    }}>
      <RouterProvider router={routes} />
    </ConfigProvider>
  );
}

export default App;
