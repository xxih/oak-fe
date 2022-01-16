import RouterIndex from "./RouterIndex";

import { useDispatch } from 'react-redux';
import { switchTeamAction, switchToken } from '@/redux';
import { useEffect } from "react";

function App() {
  
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(switchToken(false))
  }, [])

  return (
    <div className="App">
      <RouterIndex />
    </div>
  );
}

export default App;
