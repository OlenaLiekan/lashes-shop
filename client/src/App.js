import React from 'react';
import "./scss/app.scss";
import "./scss/style.scss";
import AppRoutes from './componetns/AppRoutes';
import { AuthContext } from "./context";
import UserStore from './store/UserStore';
import ProductStore from './store/ProductStore';
export const SearchContext = React.createContext();


function App() {
  const [searchValue, setSearchValue] = React.useState('');
  /*const [isAuth, setIsAuth] = React.useState(false);
  const [adminMode, setAdminMode] = React.useState(false);

*/  
 
  return (
    <>
      <AuthContext.Provider value={{
        user: new UserStore(),
        product: new ProductStore()
      }}>
        <SearchContext.Provider value={{ searchValue, setSearchValue }}>
          <AppRoutes />
        </SearchContext.Provider>
      </AuthContext.Provider>
    </>
  );
}

export default App;
