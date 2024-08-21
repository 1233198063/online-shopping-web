import React from 'react';
import Layout from './pages/Layout'
import Count from './components/Count';
import Channel from './components/Channel';

function App() {
  return (
    <div className="App">
      <Layout></Layout>
      <Count></Count>
      <Channel></Channel>
    </div>
  );
}

export default App;
