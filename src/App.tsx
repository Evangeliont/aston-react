import { Navigate, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { SingUp } from "./pages/SignUp";
import { SingIn } from "./pages/SignIn";
import { CardDetails } from "./components/Card/CardDetails";

function App() {
  return (
    <Layout>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/card/:id" element={<CardDetails />} />
        <Route path="/signUp" element={<SingUp />} />
        <Route path="/signIn" element={<SingIn />} />
        <Route path="/NotFound" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/NotFound" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
