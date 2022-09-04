import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import { useCallback, useEffect, useReducer, useRef } from 'react';
import { getItem, setItem } from './localStorage';
import { STORAGE_KEY } from './constants';
import { getData } from './utils';
import { diaryDataReducer } from './diaryDataReducer';

function App() {
  const localStorageData = getItem('diaryData');
  const [data, dispatch] = useReducer(diaryDataReducer, []);
  const dataId = useRef(new Date().getTime());

  const getInitData = async () => {
    const rawData = await getData('https://jsonplaceholder.typicode.com/comments');
    const initData = rawData.slice(0, 3).map(it => ({
      author: it.email,
      contents: it.body,
      emotion: '🤣',
      createdDate: dataId.current,
      id: dataId.current--,
    }));
    dispatch({ type: 'SET', data: initData });
  };

  useEffect(() => {
    if (localStorageData) return dispatch({ type: 'SET', data: localStorageData });
    getInitData();
  }, []);

  useEffect(() => {
    setItem(STORAGE_KEY, data);
  }, [data]);

  // useState 사용 시
  // const onCreate = useCallback((author, contents, emotion) => {
  //   const createdDate = new Date().getTime();
  //   const newItem = { author, contents, emotion, createdDate, id: dataId.current };
  //   dataId.current++;
  //   setData(prev => [newItem, ...prev]); // deps 를 [] 로 하면 data 가 초기값으로 고정되므로 이전 값을 참조하는 방식을 사용해야함.
  // }, []);

  const onCreate = useCallback((author, contents, emotion) => {
    const createdDate = new Date().getTime();
    dispatch({ type: 'CREATE', data: { author, contents, emotion, createdDate, id: dataId.current } });
    dataId.current++;
  }, []);

  const onRemove = useCallback(targetId => {
    dispatch({ type: 'REMOVE', targetId });
  }, []);

  const onEdit = useCallback((targetId, { newAuthor, newContents, newEmotion }) => {
    dispatch({ type: 'EDIT', targetId, data: { newAuthor, newContents, newEmotion } });
  }, []);

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList data={data} onRemove={onRemove} onEdit={onEdit} />
    </div>
  );
}

export default App;
