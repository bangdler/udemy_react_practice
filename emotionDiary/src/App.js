import 'App.css';
import { RouterTest } from 'components/RouterTest';
import PageRouter from 'Router';
import DiaryDataProvider from 'stores/DiaryDataProvider';

function App() {
  return (
    <div className="App">
      <DiaryDataProvider>
        <PageRouter>
          <h1>APP 입니다.</h1>
          <img alt="emotion" src={process.env.PUBLIC_URL + '/assets/emotion1.png'} />
          <br />
          <RouterTest />
        </PageRouter>
      </DiaryDataProvider>
    </div>
  );
}

export default App;
