import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import { useRef, useState } from 'react';
import { getItem, setItem } from './localStorage';

const STORAGE_KEY = 'diaryData';

function App() {
  const [data, setData] = useState(getItem('diaryData') || []);
  const dataId = useRef(0);

  const onCreate = (author, contents, emotion) => {
    const createdDate = new Date().getTime();
    const newItem = { author, contents, emotion, createdDate, id: dataId.current };
    dataId.current++;
    setItem(STORAGE_KEY, [newItem, ...data]);
    setData([newItem, ...data]);
  };

  const onDelete = id => {
    const newItem = data.filter(diary => diary.id !== id);
    setItem(STORAGE_KEY, newItem);
    setData(newItem);
  };

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList data={data} onDelete={onDelete} />
    </div>
  );
}

export default App;
