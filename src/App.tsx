import { RouterProvider } from 'react-router-dom';
import routes from './router';
import { useSelector, useDispatch } from 'react-redux';
import { ConfigProvider, theme} from 'antd';
import '@ant-design/v5-patch-for-react-19';
import { getAntdLocale, type Language } from './i18n/antd-locale';
import { useTranslation } from 'react-i18next';

function App() {
  const { i18n } = useTranslation();
  const { defaultTheme } = useSelector((state: any) => state.setting);
  const locale = getAntdLocale(i18n.language as Language);
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
