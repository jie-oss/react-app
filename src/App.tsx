import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RouterConfig from "./router/route";
import { IntlProvider } from "react-intl";
import "./common/css/index.less";
import zh from "./language/zh";
import en from "./language/en";
import "./api/mock"

const lang = 'zh'

const messages = { zh,en }[lang]

function App() {
  return (
    <IntlProvider messages={messages} locale="zh">
      <Router>
        <RouterConfig />
      </Router>
    </IntlProvider>
  );
}

export default App;
