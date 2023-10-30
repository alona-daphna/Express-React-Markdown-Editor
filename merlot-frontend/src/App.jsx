import { Login } from './pages/Login';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import { ProtectedRoute } from './components/ProtectedRoute';
import { CurrFileProvider } from './context/currFileContext';
import { PreviewPage } from './pages/PreviewPage';

function App() {
  return (
    <BrowserRouter>
      <CurrFileProvider>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/preview/:id" element={<PreviewPage />} />
        </Routes>
      </CurrFileProvider>
    </BrowserRouter>
  );
}

export default App;
