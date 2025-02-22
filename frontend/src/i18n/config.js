import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'sql.editor': 'SQL Editor',
      'test.config': 'Test Configuration',
      'test.result': 'Test Result',
      'concurrent.users': 'Concurrent Users',
      'total.requests': 'Total Requests',
      'start.test': 'Start Test',
      // ... 其他翻譯
    }
  },
  zh: {
    translation: {
      'sql.editor': 'SQL 查詢編輯器',
      'test.config': '測試配置',
      'test.result': '測試結果',
      'concurrent.users': '同時測試人數',
      'total.requests': '總共測試次數',
      'start.test': '開始測試',
      // ... 其他翻譯
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'zh',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 