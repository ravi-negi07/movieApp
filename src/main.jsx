import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import axios from "axios";
import { store } from "./store/Store.jsx";

const Token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNGNmY2U2Njc2ZWMzYTYwZmI0NWY0OGQ5YzA1ODM4NSIsIm5iZiI6MTczMzM2NTE1NC45OTEwMDAyLCJzdWIiOiI2NzUxMGRhMjkwYWEwMjZiOWRhZWQ5MjgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Y9_Wh8RkeAjB-NZAidPc_sx5vn9nY41kvcI7OmSLNAI";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

axios.defaults.headers.common["Authorization"] = `Bearer ${Token}`;

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </StrictMode>
);
