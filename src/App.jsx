import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Admin, Analytics, Dashboard, Home, Landing } from "./pages";
import { useState } from "react";
import { ProtectedRoutes } from "./components/ProtectedRoutes";

function App() {
  const [user, setUser] = useState(null);

  const login = () => {
    setUser({
      id: 1,
      name: "John",
      permissions: ['analize']
    });
  };

  const loguot = () => {
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Navigation />

      {user ? (
        <button onClick={loguot}>logout</button>
      ) : (
        <button onClick={login}>login</button>
      )}

      <Routes>
        <Route index element={<Landing />} />
        <Route path="/landing" element={<Landing />} />
        <Route element={<ProtectedRoutes isAllowed={!!user} />}>
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route
          path="/analytics"
          element={
            <ProtectedRoutes isAllowed={!!user && user.permissions.includes('analize')} redirectTo="/home">
              <Analytics />
            </ProtectedRoutes>
          }
        />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/landing">Landing</Link>
        </li>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/analytics">Analytics</Link>
        </li>
        <li>
          <Link to="/admin">Admin</Link>
        </li>
      </ul>
    </nav>
  );
};

export default App;
