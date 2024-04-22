
import { useContext } from 'react';
import './App.css';
import { AuthContext } from './context';
import AppStack from './navigation/AppStack';
import AuthStack from './navigation/AuthStack';
function App() {
  const {isLoading, userToken} = useContext(AuthContext)
  // console.log(userToken, userData)

  if (isLoading){
    return <div>Loading...</div>
  }
  return (
    <div>
      {userToken !== null ? <AppStack/> : <AuthStack/>}
    </div>
    
   
  );
}

export default App;
