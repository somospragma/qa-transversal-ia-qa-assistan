import { BrowserRouter as Router } from 'react-router-dom';
import {useAppSelector} from 'store/hooks';
import {MainRouter} from './main.router';


export const AppRouter = () => {
  const {isAuthenticated} = useAppSelector((store) => store.apiIA);
  return (
    <Router>
        <MainRouter isAuthenticated={isAuthenticated}  />
    </Router>
  )
}

export default AppRouter