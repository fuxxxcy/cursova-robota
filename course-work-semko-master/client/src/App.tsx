import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Sidebar } from './components';
import AppRoutes from './AppRoutes';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <RouterProvider router={AppRoutes} />
    </div>
  );
}

export default App;
