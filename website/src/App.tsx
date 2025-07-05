import type { FC } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Providers from "./providers/Providers";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import Admin from "./components/dashboard/Admin";
import AdminPage from "./pages/AdminPage";
import AdminUsers from "./components/dashboard/AdminUsers";
import { steps } from "./utils/steps";
import CreatorPanel from "./pages/CreatorPanel";


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

            {/* Creator Panel */}
            <Route path="/panel" element={<CreatorPanel />}>
              <Route path="verify" element={<Outlet />}>
                {steps.map((step) => (
                  <Route
                    key={step.path}
                    path={step.path}
                    element={<step.component />}
                  />
                ))}
              </Route>
            </Route>
            
          </Routes>
      </BrowserRouter>
    </Providers>
  );
};

export default App;
