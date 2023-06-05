import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import { Provider } from "react-redux";
import store from "../store";

test("renders the App Component", () => {
  try {
    const {getByText} = render(
        <Provider store={store}>
          <App />
        </Provider>
    );
    } catch (e) {
      console.error("app is not renderd",e)
      const el = getByText('Data', { exact: false })
      expect(el.textContent).toEqual('Data Table');
    }
});