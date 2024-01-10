import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import { createContext, useState } from "react";
export const AppContext = createContext();

function App() {
  const [current, setCurrent] = useState("");
  const [toggleDate, setToggleDate] = useState(false);
  return (
    <AppContext.Provider value={{ current, setCurrent, toggleDate, setToggleDate }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/register" element={<p>Register</p>} />
            <Route path="/login" element={<p>Login</p>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
