import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/core/Header";
import BlogsPage from "./pages/blogs/page";
import LoginPage from "./pages/login/page";
import RegisterPage from "./pages/register/page";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<BlogsPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
