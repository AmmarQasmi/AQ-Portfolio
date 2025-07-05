import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Layout from './Layout';
import Home from './pages/Home';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';  
import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements } from 'react-router-dom';

function App() {
  // Create the router with routes
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />        
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Route>
    )
  );

  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}

createRoot(document.getElementById('root')).render(<App />);