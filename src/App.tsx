import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import ActivePulse from './pages/ActivePulse';
import Sidebar from './components/Sidebar';
import { DemoDataProvider } from './context/DemoDataContext';
import ClientPortal from './pages/ClientPortal';
import Dashboard from './pages/Dashboard';
import Dispatches from './pages/Dispatches';
import DispatchDetails from './pages/DispatchDetails';

function App() {
  return (
    <BrowserRouter>
      <DemoDataProvider>
        <div className="flex min-h-screen bg-slate-100">
          <Sidebar />

          <main className="flex-1 p-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />

              <Route
                path="/dispatch"
                element={<Dispatches />}
              />

              <Route
                path="/dispatch/:id"
                element={<DispatchDetails />}

              />
              <Route
                path="/client"
                element={<ClientPortal />}
              />

              <Route
                    path="/active-pulse"
                    element={<ActivePulse />}
                  />
            </Routes>
          </main>
        </div>
      </DemoDataProvider>
    </BrowserRouter>
  );
}

export default App;