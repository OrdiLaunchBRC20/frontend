import "./App.css";
import "./assets/css/font.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Layout from "./components/layout";
import Landing from "./pages/landing";
import Swap from "./pages/swap";
import Earn from "./pages/earn";
import Ido from "./pages/ido";
import Airdrop from "./pages/airdrop";

axios.interceptors.request.use(
  function (config: any) {
    // Do something before request is sent
    const token = window.localStorage.getItem("jwt-authenticationToken");
    if (token && config?.headers) {
      if (config && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      }
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route index element={<Landing />} /> */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="swap" element={<Swap />} />
          <Route path="earn" element={<Earn />} />
          <Route path="ido" element={<Ido />} />
          <Route path="airdrop" element={<Airdrop />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
