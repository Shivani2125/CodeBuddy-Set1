import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/index.css';
import Form1 from './pages/Form1';
import Form2 from './pages/Form2';
import Form3 from './pages/Form3';
import Posts from './pages/Posts';

const Router = () => (
  <>
    <h3>Set 1</h3>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Form1 />} />
        <Route path="/Form1" element={<Form1 />} />
        <Route path="/Form2" element={<Form2 />} />
        <Route path="/Form3" element={<Form3 />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </BrowserRouter>
  </>
);

export default Router;
