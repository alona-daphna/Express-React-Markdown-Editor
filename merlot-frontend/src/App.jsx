import { Login } from './pages/Login';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import { ProtectedRoute } from './components/ProtectedRoute';
import { CurrFileProvider } from './context/currFileContext';

function App() {
  return (
    <BrowserRouter>
      <CurrFileProvider>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </CurrFileProvider>
    </BrowserRouter>
  );
}

export default App;
