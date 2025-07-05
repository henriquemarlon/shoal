import type { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Providers from "./providers/Providers";
import Login from "../pages/Login";


const App: FC = () => {
  return (
    <Providers>
      <BrowserRouter>
          <Routes>
             <Route path="/login" element={<Login />} />
          </Routes>
      </BrowserRouter>
    </Providers>
  );
};

export default App;
