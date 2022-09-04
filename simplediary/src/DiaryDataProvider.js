import { getItem, setItem } from './localStorage';
import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import { diaryDataReducer } from './diaryDataReducer';
import { getData } from './utils';
import { STORAGE_KEY } from './constants';
import { DiaryDispatchContext, DiaryStateContext } from './diaryContext';

export default function DiaryDataProvider({ children }) {
  const localStorageData = useMemo(() => getItem(STORAGE_KEY), []);
  const [data, dispatch] = useReducer(diaryDataReducer, localStorageData ? localStorageData : []);
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
    if (localStorageData) return;
    getInitData();
  }, [localStorageData]);

  useEffect(() => {
    setItem(STORAGE_KEY, data);
  }, [data]);

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

  const memoizedDispatches = useMemo(() => {
    return { onCreate, onRemove, onEdit };
  }, [onCreate, onRemove, onEdit]);

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>{children}</DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}
