import type { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Providers from "./providers/Providers";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";


const App: FC = () => {
  return (
    <Providers>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
             <Route path="/login" element={<Login />} />
          </Routes>
      </BrowserRouter>
    </Providers>
  );
};

export default App;
