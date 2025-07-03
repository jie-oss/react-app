import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RouterConfig from "./router/route";
import { IntlProvider } from "react-intl";
import "./common/css/index.less";
import zh from "./language/zh";
import en from "./language/en";
import "./api/mock"
import "./common/css/home.less";
import { getStorage } from "./lib/utils";

type LangType = 'zh' | 'en';
const lang: LangType = (getStorage('lang') as LangType) || 'zh'; // 默认语言为中文

const messages = { zh, en }[lang];

function App() {
  return (
    <IntlProvider messages={messages} locale={lang} defaultLocale="zh">
      <Router>
        <RouterConfig />
      </Router>
    </IntlProvider>
  );
}

export default App;
