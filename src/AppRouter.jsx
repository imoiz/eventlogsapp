import { Routes, Route } from "react-router-dom";
// Import your page components
import LandingPage from "./Pages/Home/LandingPage";
import ReturnInquiry from "./Pages/Return/ReturnInquiry/ReturnInquiry";
import CustomerCareDashboard from "./Pages/Dashboards/CustomerCare/CustomerCareDashboard";
import ReturnsDashboard from "./Pages/Dashboards/Returns/ReturnsDashboard";
import UserRegistration from "./Pages/User/UserRegistration/UserRegistration"; // ✅ Import User Registration component

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/return-inquiry" element={<ReturnInquiry />} />
      <Route path="/customer-care-dashboard" element={<CustomerCareDashboard />} />
      <Route path="/returns-dashboard" element={<ReturnsDashboard />} />
      <Route path="/user-registration" element={<UserRegistration />} />
    </Routes>
  );
};

export default AppRouter;
