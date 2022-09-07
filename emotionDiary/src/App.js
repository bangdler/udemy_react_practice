import 'App.css';
import { RouterTest } from 'components/RouterTest';
import MyButton from 'components/MyButton';
import MyHeader from 'components/MyHeader';
import PageRouter from 'Router';

function App() {
  return (
    <div className="App">
      <PageRouter>
        <MyHeader
          headText="my Header"
          leftChild={<MyButton text={'왼쪽버튼'} />}
          rightChild={<MyButton text={'오른쪽버튼'} />}
        ></MyHeader>
        <h1>APP 입니다.</h1>
        <img alt="emotion" src={process.env.PUBLIC_URL + '/assets/emotion1.png'} />
        <MyButton text="myButton" />
        <MyButton type="positive" text="myButton" />
        <MyButton type="negative" text="myButton" />
        <br />
        <RouterTest />
      </PageRouter>
    </div>
  );
}

export default App;
