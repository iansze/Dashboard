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
import { useEffect, useState } from "react";
import Loading from "./components/loading/Loading";

function App() {
  const [isLoading, setLoading] = useState(true);
  const [isSlow, setSlow] = useState(false);
  const queryClient = new QueryClient();

  useEffect(() => {
    const alreadyLoaded = localStorage.getItem("alreadyLoaded");

    if (!alreadyLoaded) {
      localStorage.setItem("alreadyLoaded", "true");

      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);

      const slowLoadTimer = setTimeout(() => {
        if (isLoading) {
          setSlow(true);
        }
      }, 5000);

      return () => {
        clearTimeout(timer);
        clearTimeout(slowLoadTimer);
      };
    } else {
      setLoading(false);
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div>
        {isSlow ? (
          <Loading messagae="This may take a little longer due to your connection speed." />
        ) : (
          <Loading messagae="Loading, please wait..." />
        )}
      </div>
    );
  }

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
