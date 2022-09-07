import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Diary, Edit, Home, New } from 'pages';

export default function PageRouter({ children }) {
  return (
    <BrowserRouter>
      {children}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/diary/:id" element={<Diary />} />
        <Route path="/new" element={<New />} />
        <Route path="/edit" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}
