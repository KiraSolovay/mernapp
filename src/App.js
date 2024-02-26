import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from './utilities/users-service'
// pages
import AuthPage from "./pages/Auth";
import NewOrderPage from "./pages/NewOrder";
import OrderHistoryPage from "./pages/OrderHistory";
import NavBar from "./components/Nav/Nav";

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      {user ? 
        <>
          <NavBar user={user} />
          <Routes>
            <Route path="/orders/new" element={<NewOrderPage />} />
            <Route path="/orders" element={<OrderHistoryPage />} />
          </Routes>
        </>
       : 
          <AuthPage setUser={setUser} />
      }
    </main>
  );
    }