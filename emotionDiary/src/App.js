import 'App.css';
import PageRouter from 'Router';
import DiaryDataProvider from 'stores/DiaryDataProvider';

function App() {
  return (
    <div className="App">
      <DiaryDataProvider>
        <PageRouter />
      </DiaryDataProvider>
    </div>
  );
}

export default App;
