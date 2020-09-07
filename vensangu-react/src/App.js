import React from 'react';
import RenderImages from './RenderImages/RenderImages';
import './App.scss';
import TopFrame from './TopFrame/TopFrame';

function App() {
  return (
    <div className="App">
      <TopFrame />
      <RenderImages category="portfolio"/>
      <RenderImages category="portrait"/>
      <RenderImages category="family"/>
    </div>
  );
}

export default App;
