import React, { useCallback, useMemo, useReducer, useEffect, useRef } from 'react';
import { getData } from 'utils/api';
import { getItem, setItem } from 'utils/localStorage';
import { STORAGE_KEY } from 'utils/constants';

export const DiaryDataContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.data;
    case 'CREATE':
      return [action.data, ...state];
    case 'REMOVE':
      return state.filter(it => it.id !== action.targetId);
    case 'EDIT':
      return state.map(it => (it.id === action.targetId ? action.data : it));
    default:
      return state;
  }
};

export default function DiaryDataProvider({ children }) {
  const localStorageData = getItem(STORAGE_KEY);
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(new Date().getTime());

  const getInitData = async () => {
    const rawData = await getData('https://jsonplaceholder.typicode.com/comments');
    const initData = rawData.slice(0, 5).map((it, idx) => ({
      contents: it.body,
      emotion: 1 + idx,
      date: new Date().getTime() + idx,
      id: idx + 1,
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

  const onCreate = useCallback(({ date, contents, emotion }) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        contents,
        emotion,
      },
    });
    dataId.current += 1;
  }, []);

  const onRemove = useCallback(targetId => {
    dispatch({ type: 'REMOVE', targetId });
  }, []);

  const onEdit = useCallback(({ targetId, date, contents, emotion }) => {
    dispatch({
      type: 'EDIT',
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        contents,
        emotion,
      },
    });
  }, []);

  const memoizedDiaryDispatches = useMemo(() => ({ onCreate, onRemove, onEdit }), [onCreate, onRemove, onEdit]);
  return (
    <DiaryDataContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDiaryDispatches}>{children}</DiaryDispatchContext.Provider>
    </DiaryDataContext.Provider>
  );
}
