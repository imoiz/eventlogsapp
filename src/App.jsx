import { useEffect, useState } from 'react';
import './App.css';
import { login, trySilentLogin, logout, getActiveAccount } from './auth/authService';
import Layout from './Layout/Layout.jsx';
import LandingPage from './Pages/Home/LandingPage';
import AppRouter from './AppRouter.jsx';
function App() {
  const [account, setAccount] = useState(null);
  const [isStandalone, setIsStandalone] = useState(true);
  useEffect(() => {
    const init = async () => {
      const user = await trySilentLogin();
      if (!user) {
        login(); // Show Microsoft login if no silent login possible
      } else {
        setAccount(user);
      }
    };
    init();
  }, []); 
  return (
    <>     
      {account ? (

        isStandalone ?( 
        <Layout>
          <AppRouter /> {/* ✅ Routing inside Layout */}
         </Layout>
         ):(           
          <div className="container-fluid">
             <AppRouter /> {/* ✅ Routing in container mode */}
          </div>
      )    


      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default App; 

