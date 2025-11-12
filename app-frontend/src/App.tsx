import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Topbar from "./components/Topbar";
import LoginPage from "./pages/LoginPage";
import DashboardStreamerPage from "./pages/DashboardStreamerPage"
import DashboardDonorPage from "./pages/DashboardDonorPage"
import HomePage from "./pages/HomePage"
import SigninPage from "./pages/SigninPage";
import ProfilePage from "./pages/ProfilePage";
import AccountingPage from "./pages/AccountingPage"
import WidgetPage from "./pages/WidgetPage";
import OverlayPage from "./pages/OverlayPage"
import DonationHistoryPage from "./pages/DonationHistoryPage"

// Move useLocation to AppWrapper
function AppWrapper() {
  const location = useLocation();
  const hideTopbar =
  location.pathname === "/login" ||
  location.pathname === "/signin" ||
  location.pathname === "/overlay";

  return (
    <>
      {!hideTopbar  && <Topbar />} 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signin" element={<SigninPage/>} />
        <Route path="/dashboard/streamer" element={<DashboardStreamerPage />} />
        <Route path="/dashboard/donor" element={<DashboardDonorPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/accounting" element={<AccountingPage />} />
        <Route path="/widget" element={<WidgetPage />} />
        <Route path="/overlay" element={<OverlayPage/>} />
        <Route path="/donation-history" element={<DonationHistoryPage/>} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppWrapper /> {/* Wrap AppWrapper with BrowserRouter */}
    </BrowserRouter>
  );
}

export default App;
