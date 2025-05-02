import { FC, Suspense, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { routerList } from './routes';
import { ProtectedRoute } from './protected.router';
import {useAppDispatch} from 'store/hooks';
import {setAuthenticated} from 'store/slices';

interface IProps {
  isAuthenticated: boolean;
}

export const MainRouter: FC<IProps> = ({ isAuthenticated }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    validApiKeyStorage();
    // eslint-disable-next-line
  }, [])
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/assistant');
      return;
    }
    navigate('/');
    // eslint-disable-next-line
  }, [isAuthenticated]);

  const validApiKeyStorage = async () => {
    const apiKey = await localStorage.getItem('apiKey');
    if(apiKey){
      dispatch(setAuthenticated({key: apiKey}));
    }
  }

  const getRoutes = (isAuthenticated: boolean) => {
    const routeList = isAuthenticated ? routerList.private : routerList.public;

    return routeList.map(({ to, Component }, index) => (
      <Route
        key={index}
        path={to}
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated} type={isAuthenticated ? 'private' : 'public'}>
            <Suspense fallback="Cargando página...">
              <Component />
            </Suspense>
          </ProtectedRoute>
        }
      />
    ));
  };

  return (
    <Routes>
      {getRoutes(isAuthenticated)}
      <Route path="*" element={<h2>No  página no encontrada</h2>} />
    </Routes>
  );
}

export default MainRouter