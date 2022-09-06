import 'App.css';
import { Diary, Home, Edit, New } from 'pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RouterTest } from 'components/RouterTest';
import MyButton from 'components/MyButton';
import Myheader from './components/Myheader';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Myheader
          headText="my Header"
          leftChild={<MyButton text={'왼쪽버튼'} />}
          rightChild={<MyButton text={'오른쪽버튼'} />}
        ></Myheader>
        <h1>APP 입니다.</h1>
        <img alt="emotion" src={process.env.PUBLIC_URL + '/assets/emotion1.png'} />
        <MyButton text="myButton" />
        <MyButton type="positive" text="myButton" />
        <MyButton type="negative" text="myButton" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/diary/:id" element={<Diary />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit" element={<Edit />} />
        </Routes>
        <RouterTest />
      </div>
    </BrowserRouter>
  );
}

export default App;
