import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Layout from "./components/layout/Layout";
import Login from "./pages/login/Login";
import Users from "./pages/users/Users";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Products from "./pages/products/Products";
import Orders from "./pages/orders/Orders";
import Calendar from "./pages/calendar/Calendar";
import BarChartPage from "./pages/barChart/BarChartPage";
import LineChartPage from "./pages/lineChart/LineChartPage";
import PieChartPage from "./pages/pieChart/PieChartPage";
import SignUp from "./pages/signUp/SignUp";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Navigate to="/" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/users" element={<Users />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/barChart" element={<BarChartPage />} />
            <Route path="/lineChart" element={<LineChartPage />} />
            <Route path="/pieChart" element={<PieChartPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
