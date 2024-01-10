import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import { createContext, useState } from "react";
export const AppContext = createContext();

function App() {
  const [current, setCurrent] = useState("");
  const [toggleDate, setToggleDate] = useState(false);
  const [toggleGuest, setToggleGuest] = useState(false);
  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
    infants: 0,
  });
  return (
    <AppContext.Provider
      value={{
        current,
        setCurrent,
        toggleDate,
        setToggleDate,
        toggleGuest,
        setToggleGuest,
        guests,
        setGuests,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/register" element={<p>Register now</p>} />
            <Route path="/login" element={<p>Login</p>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
