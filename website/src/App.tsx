import type { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Providers from "./providers/Providers";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import Admin from "./components/dashboard/Admin";
import AdminPage from "./pages/AdminPage";
import AdminUsers from "./components/dashboard/AdminUsers";


const App: FC = () => {
  return (
    <Providers>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
             <Route path="/login" element={<Login />} />

             {/* Admin */}
            <Route path="/admin" element={<AdminPage />}>
              <Route index element={<Admin />} />
              <Route path="users" element={<AdminUsers />} />
            </Route>
            
          </Routes>
      </BrowserRouter>
    </Providers>
  );
};

export default App;
