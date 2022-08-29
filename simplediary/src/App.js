import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import { useRef, useState } from 'react';
import { getItem, setItem } from './localStorage';

const STORAGE_KEY = 'diaryData';

function App() {
  const localStorageData = getItem('diaryData');
  const [data, setData] = useState(localStorageData || []);
  const dataId = useRef(new Date().getTime());

  const onCreate = (author, contents, emotion) => {
    const createdDate = new Date().getTime();
    const newItem = { author, contents, emotion, createdDate, id: dataId.current };
    dataId.current++;
    setItem(STORAGE_KEY, [newItem, ...data]);
    setData([newItem, ...data]);
  };

  const onRemove = id => {
    const newItem = data.filter(diary => diary.id !== id);
    setItem(STORAGE_KEY, newItem);
    setData(newItem);
  };

  const onEdit = (id, newContents) => {
    const newItem = data.map(diary => (diary.id === id ? { ...diary, contents: newContents } : diary));
    setItem(STORAGE_KEY, newItem);
    setData(newItem);
  };
  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList data={data} onRemove={onRemove} onEdit={onEdit} />
    </div>
  );
}

export default App;
