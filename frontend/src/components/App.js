import { useState,useEffect } from "react";
import AppRouter from "./Router";
const App = ()=>{
  const [isLoggedIn, setIsLoggedIn]=useState(false);
  const [isLoadding, setIsLoading]=useState(true);
  useEffect(() => {
    const fetchLoginStatus = async () => {
      const savedLogin = await localStorage.getItem('isLoggedIn');
      if (savedLogin === 'true') {
        setIsLoggedIn(true);
      }
      setIsLoading(false);
    };

    fetchLoginStatus();
  }, []);
  return(
    <div>
      
      <AppRouter isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </div>
  )
}

export default App;
