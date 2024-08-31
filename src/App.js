import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { startAuthListener } from './store/auth';

import Layout from './pages/Layout'
// import Count from './components/Count';
// import Register from './components/Register';
// import Login from './components/Login';
// import AddData from './components/AddData';
// import ReadData from './components/ReadData';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startAuthListener());
  }, [dispatch]);

  return (
    <div className="App">
      <Layout></Layout>
      {/* <Count></Count> */}
      {/* <Register></Register>
      <Login></Login>
      <AddData></AddData>
      <ReadData></ReadData> */}
    </div>
  );
}

export default App;
