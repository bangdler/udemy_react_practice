import React, { useCallback, useEffect, useMemo, useReducer } from 'react';

export const SortedDiaryContext = React.createContext();
export const SortedDiaryDispatchContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET': {
      return action.data;
    }
    case 'LATEST': {
      // 배열은 참조형이므로 sort 시에 상태 변경을 인식하지 못하고 re render 가 발생하지 않음.
      return JSON.parse(JSON.stringify(state)).sort((a, b) => Number(b.date) - Number(a.date));
    }
    case 'OLDEST': {
      return JSON.parse(JSON.stringify(state)).sort((a, b) => Number(a.date) - Number(b.date));
    }
    default:
      return state;
  }
};

export default function SortedDiaryProvider({ children, curMonthDiaryList }) {
  const [data, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    dispatch({ type: 'SET', data: curMonthDiaryList });
  }, [curMonthDiaryList]);

  const sortLatest = useCallback(() => {
    dispatch({ type: 'LATEST' });
  }, []);
  const sortOldest = useCallback(() => {
    dispatch({ type: 'OLDEST' });
  }, []);

  const memoizedDispatches = useMemo(() => ({ sortOldest, sortLatest }), [sortOldest, sortLatest]);

  return (
    <SortedDiaryContext.Provider value={data}>
      <SortedDiaryDispatchContext.Provider value={memoizedDispatches}>{children}</SortedDiaryDispatchContext.Provider>
    </SortedDiaryContext.Provider>
  );
}
