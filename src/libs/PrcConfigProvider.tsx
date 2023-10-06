import { ThemeProvider } from '@emotion/react';
import { ConfigProvider, theme } from 'antd';
import enUS from 'antd/locale/en_US';
import jaJP from 'antd/locale/ja_JP';
import koKR from 'antd/locale/ko_KR';
import zhCN from 'antd/locale/zh_CN';
import { Draft, produce } from 'immer';
import { createContext, Dispatch, useReducer } from 'react';

import { AccentColors, BgColors, Locales } from './token.ts';

const { useToken, darkAlgorithm } = theme;

const locales = {
  [Locales.cn]: zhCN,
  [Locales.en]: enUS,
  [Locales.ko]: koKR,
  [Locales.ja]: jaJP,
};
const defaultState = {
  bgColor: BgColors.light,
  accentColor: AccentColors.indigo,
  locale: Locales.cn,
};
interface State {
  bgColor: BgColors;
  accentColor: AccentColors;
  locale: Locales;
}
export const PrcConfigContext = createContext<
  { store: State } & { dispatch: Dispatch<(state: State) => void> }
>({
  store: defaultState,
  dispatch: () => undefined,
});
function reducer(draft: Draft<State>, action: (state: State) => void) {
  return action(draft);
}
export const PrcConfigProvider = ({ children }: any) => {
  const { token } = useToken();

  function genAlgorithm() {
    if (store.bgColor === 'system') {
      const themeMedia = window.matchMedia('(prefers-color-scheme: light)');
      if (themeMedia.matches) {
        document.body.className = 'light-mode';
        return [];
      } else {
        document.body.className = 'dark-mode';
        return [darkAlgorithm];
      }
    } else if (store.bgColor === 'light') {
      document.body.className = 'light-mode';
      return [];
    } else {
      document.body.className = 'dark-mode';
      return [darkAlgorithm];
    }
  }
  const [store, dispatch] = useReducer(produce(reducer), defaultState);
  return (
    <PrcConfigContext.Provider value={{ store, dispatch }}>
      <ConfigProvider
        locale={locales[store.locale]}
        theme={{
          token: {
            colorPrimary: store.accentColor,
          },
          algorithm: genAlgorithm(),
        }}
      >
        <ThemeProvider theme={token}>{children}</ThemeProvider>
      </ConfigProvider>
    </PrcConfigContext.Provider>
  );
};
