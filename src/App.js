import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { startAuthListener } from './store/auth';

import Layout from './pages/Layout';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startAuthListener());
  }, [dispatch]);

  return (
    <div className="App">
      <Layout></Layout>
    </div>
  );
}

export default App;
