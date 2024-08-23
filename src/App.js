import React from 'react';
import Layout from './pages/Layout'
import Count from './components/Count';
import Channel from './components/Channel';
import Register from './components/Register';

function App() {
  return (
    <div className="App">
      <Layout></Layout>
      <Count></Count>
      <Channel></Channel>
      <Register></Register>
    </div>
  );
}

export default App;
