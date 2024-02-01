import React from 'react';
import './App.css';
import TableTasks from './components/TableTasks';
import Top from './components/Top';

function App() {
  return (
    <div className="App">
      <div className='table__wrap'>
      <Top/>
      <TableTasks />
      </div>
    </div>
  );
}

export default App;
