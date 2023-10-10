import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ProtectedRoutes from './components/protectedRoutes/ProtectedRoutes';
import Login from './containers/auth/Login';
import ClientCervantesForm from './containers/catalogo/client/ClientCervantesForm';
import routes from './routes';
import { Provider } from 'react-redux';
import store from './store';

function App() {


  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="h-full min-h-screen">
          <Routes>
            <Route element={<ProtectedRoutes />}>
              {
                routes.map(route => (
                  <Route key={route.path} path={route.path} element={<route.component />} />
                ))
              }
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/schools/:school_id/register_clients" element={<ClientCervantesForm />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
