import React, { useCallback, useMemo, useReducer } from 'react';

const DiaryDataContext = React.createContext();
const DiaryDispatchContext = React.createContext();

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
  const [data, dispatch] = useReducer(reducer, []);

  const onCreate = useCallback(({ date, contents, emotion }) => {
    const curTime = new Date(date).getTime();
    dispatch({
      type: 'CREATE',
      data: {
        id: curTime,
        date: curTime,
        contents,
        emotion,
      },
    });
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
