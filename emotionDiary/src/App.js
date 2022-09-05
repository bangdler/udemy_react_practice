import './App.css';
import { Diary, Home, Edit, New } from 'pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>APP 입니다.</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/diary" element={<Diary />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit" element={<Edit />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
