import React from 'react';
import Layout from './pages/Layout'
import Count from './components/Count';
import Register from './components/Register';
import Login from './components/Login';
import AddData from './components/AddData';
import ReadData from './components/ReadData';

function App() {
  return (
    <div className="App">
      <Layout></Layout>
      <Count></Count>
      <Register></Register>
      <Login></Login>
      <AddData></AddData>
      <ReadData></ReadData>
    </div>
  );
}

export default App;
