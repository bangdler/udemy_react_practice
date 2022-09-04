import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import DiaryDataProvider from './DiaryDataProvider';

function App() {
  return (
    <DiaryDataProvider>
      <div className="App">
        <DiaryEditor />
        <DiaryList />
      </div>
    </DiaryDataProvider>
  );
}

export default App;
