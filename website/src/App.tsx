import type { FC } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Providers from "./providers/Providers";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import Admin from "./components/dashboard/Admin";
import AdminPage from "./pages/AdminPage";
import { steps } from "./utils/steps";
import CreatorPanel from "./pages/CreatorPanel";
import Campaigns from "./components/dashboard/Campaigns";
import ProfilePage from "./pages/ProfilePage";
import { WelcomeScreen } from "./components/vlayer";
import InvestorPage from "./pages/InvestorPage";
import Investments from "./components/dashboard/Investiments";
import VideoFeed from "./components/dashboard/VideoFeed";

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
            </Route>

            {/* Investor Panel */}
            <Route path="/investor" element={<InvestorPage />}>
              <Route index element={<VideoFeed />} />
              <Route path="investments" element={<Investments />} />
              <Route path="profile" element={<ProfilePage />} /> 
            </Route>

            {/* Creator Panel */}
            <Route path="/panel" element={<CreatorPanel />}>
              <Route element={<Campaigns />}>
                <Route index element={<WelcomeScreen />} />
                {steps.filter(s => s.path).map((step) => (
                  <Route
                    key={step.path}
                    path={step.path}
                    element={<step.component />}
                  />
                ))}
              </Route>
              
              <Route path="profile" element={<ProfilePage />} /> 
            </Route>
            
          </Routes>
      </BrowserRouter>
    </Providers>
  );
};

export default App;
