import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "../components/RegisterPage.jsx";
import GenerateOtp from "../components/GenerateOtp.jsx";
import VerifyOtp from "../components/VerifyOtp.jsx";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/generate-otp" element={<GenerateOtp />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoutes;
