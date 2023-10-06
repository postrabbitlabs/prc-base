import { css } from '@emotion/react';
import { Button, ColorPicker, DatePicker, Select } from 'antd';
import i18n from 'i18next';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import languages from '../libs/languages.json';
import { PrcConfigContext } from '../libs/PrcConfigProvider.tsx';
import { AccentColors, BgColors, Locales } from '../libs/token.ts';

const filterOption = (input: string, option?: { label: string; value: string }) => {
  return (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
};

const Home = () => {
  const { store, dispatch } = useContext(PrcConfigContext);
  const { t } = useTranslation();
  return (
    <div>
      {JSON.stringify(store)}
      <Button
        onClick={() => {
          dispatch((state) => {
            state.bgColor = (state.bgColor === 'light' ? 'dark' : 'light') as BgColors;
          });
        }}
      >
        切换主题
      </Button>

      <Select
        defaultValue={'cn'}
        filterOption={filterOption}
        showSearch={true}
        onChange={(value) => {
          i18n.changeLanguage(value);
          dispatch((state) => {
            state.locale = value as Locales;
          });
        }}
        css={css`
          width: 160px;
        `}
        options={languages
          .filter((language) => ['cn', 'en', 'ja', 'ko'].includes(language.code))
          .map((language) => ({
            label: language.name,
            value: language.code,
          }))}
      />
      <ColorPicker
        onChange={(color) => {
          console.log(color.toHex());
          dispatch((state) => {
            state.accentColor = color.toHex() as AccentColors;
          });
        }}
        disabledAlpha
        presets={[
          {
            label: 'Recommended',
            colors: [
              '#F5222D',
              '#FA8C16',
              '#FADB14',
              '#8BBB11',
              '#52C41A',
              '#13A8A8',
              '#1677FF',
              '#2F54EB',
            ],
          },
        ]}
      />
      <DatePicker />
      <Button type={'primary'}>{t('action.autoscroll')}</Button>
    </div>
  );
};

export default Home;
