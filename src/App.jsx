import LoginForm from "./components/LoginForm";
import Header from "./components/Header";
import Feed from "./components/Feed";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/helper/ProtectedRoute";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { autoLogin } from "./store/login";
import { useDispatch } from "react-redux";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(autoLogin());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route
            path="/conta"
            element={
              <ProtectedRoute>
                <Feed />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
