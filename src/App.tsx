import HomePage from "@core/pages/HomePage";
import { Provider } from "react-redux";

import { appStore } from "./store/appStore";

const store = appStore();

export default function App() {
  return (
    <Provider store={store}>
      <HomePage />
    </Provider>
  );
}
