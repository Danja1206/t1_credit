import ReactDOM from "react-dom/client";
import App from "./App";

import { BrowserRouter, HashRouter } from "react-router-dom";

import { store } from "./store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);
