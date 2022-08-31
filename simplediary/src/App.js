import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import { useEffect, useRef, useState } from 'react';
import { getItem, setItem } from './localStorage';
import { STORAGE_KEY } from './constants';

function App() {
  const localStorageData = getItem('diaryData');
  const [data, setData] = useState([]);
  const dataId = useRef(new Date().getTime());

  const getInitData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/comments');
      if (response.ok) {
        const jsonData = await response.json();
        const initData = jsonData.slice(0, 3).map(it => ({
          author: it.email,
          contents: it.body,
          emotion: '🤣',
          createdDate: dataId.current,
          id: dataId.current--,
        }));
        setItem(STORAGE_KEY, initData);
        setData(initData);
        return;
      }
      throw new Error('API 통신 에러');
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (localStorageData) {
      return setData(localStorageData);
    }
    getInitData();
  }, []);

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

  const onEdit = (id, { newAuthor, newContents, newEmotion }) => {
    const newItem = data.map(diary =>
      diary.id === id ? { ...diary, author: newAuthor, contents: newContents, emotion: newEmotion } : diary,
    );
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
