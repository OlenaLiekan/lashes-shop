import React from 'react';
import './scss/app.scss';
import './scss/style.scss';
import AppRoutes from './componetns/AppRoutes';
import { AuthContext } from './context';
export const SearchContext = React.createContext();

function App() {
  const [searchValue, setSearchValue] = React.useState('');
  const [isAuth, setIsAuth] = React.useState(false);
  const [adminMode, setAdminMode] = React.useState(false);
  const [createMode, setCreateMode] = React.useState(false);
  const [updateMode, setUpdateMode] = React.useState(false);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (localStorage.getItem('auth', 'true')) {
      setIsAuth(true);
    }
    if (localStorage.getItem('adminMode', 'true')) {
      setAdminMode(true);
    }
    setLoading(false);
  }, []);

  return (
    <>
      <AuthContext.Provider
        value={{
          isAuth,
          setIsAuth,
          adminMode,
          setAdminMode,
          isLoading,
          createMode,
          setCreateMode,
          updateMode,
          setUpdateMode,
        }}
      >
        <SearchContext.Provider value={{ searchValue, setSearchValue }}>
          <AppRoutes />
        </SearchContext.Provider>
      </AuthContext.Provider>
    </>
  );
}

export default App;
