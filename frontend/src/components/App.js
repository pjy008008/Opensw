import { useState } from "react";
import AppRouter from "./Router";
const App = ()=>{
  const [isLoggedIn, setIsLoggedIn]=useState(true);
  return(
    <div>
      <AppRouter isLoggedIn={isLoggedIn} />
    </div>
  )
}

export default App;
