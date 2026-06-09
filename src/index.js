import React from "react";
import ReactDOM from "react-dom/client";
import "normalize.css/normalize.css";
import "@/styles/index.css";

import App from "@/pages/App.jsx";
import { Provider } from "react-redux";
// PersistGate 向下分发persistStore对象；
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistor, store } from "@/store/index.js";
import * as serviceWorkerRegistration from "@/serviceWorkerRegistration";
//import reportWebVitals from '@/template/reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate 
      loading={null}
      persistor={persistor}
    >
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// 在实际开发时别注册 Service Worker！否则他可能会把缓存的上一个有 BUG 的网页等发给浏览器！
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals(console.log);
