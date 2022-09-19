import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react';

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
    case 'LATEST_ALL': {
      return JSON.parse(JSON.stringify(action.data)).sort((a, b) => Number(b.date) - Number(a.date));
    }
    case 'OLDEST_ALL': {
      return JSON.parse(JSON.stringify(action.data)).sort((a, b) => Number(a.date) - Number(b.date));
    }
    case 'GOOD': {
      return JSON.parse(JSON.stringify(action.data)).filter(it => Number(it.emotion) <= 3);
    }
    case 'BAD': {
      return JSON.parse(JSON.stringify(action.data)).filter(it => Number(it.emotion) > 3);
    }
    default:
      return state;
  }
};

export default function SortedDiaryProvider({ children, curMonthDiaryList }) {
  const [data, dispatch] = useReducer(reducer, []);
  const [latest, setLatest] = useState('LATEST');

  useEffect(() => {
    dispatch({ type: 'SET', data: curMonthDiaryList });
    if (!curMonthDiaryList) return;
    dispatch({ type: 'LATEST' });
  }, [curMonthDiaryList]);

  const sortLatest = useCallback(() => {
    setLatest('LATEST');
    dispatch({ type: 'LATEST' });
  }, []);

  const sortOldest = useCallback(() => {
    setLatest('OLDEST');
    dispatch({ type: 'OLDEST' });
  }, []);

  const sortAll = useCallback(() => {
    if (latest === 'LATEST') {
      dispatch({ type: 'LATEST_ALL', data: curMonthDiaryList });
    } else if (latest === 'OLDEST') {
      dispatch({ type: 'OLDEST_ALL', data: curMonthDiaryList });
    }
  }, [curMonthDiaryList]);

  const sortGood = useCallback(() => {
    dispatch({ type: 'GOOD', data: curMonthDiaryList });
  }, [curMonthDiaryList]);

  const sortBad = useCallback(() => {
    dispatch({ type: 'BAD', data: curMonthDiaryList });
  }, [curMonthDiaryList]);

  const memoizedDispatches = useMemo(
    () => ({ sortOldest, sortLatest, sortAll, sortGood, sortBad }),
    [sortOldest, sortLatest, sortAll, sortGood, sortBad],
  );

  return (
    <SortedDiaryContext.Provider value={data}>
      <SortedDiaryDispatchContext.Provider value={memoizedDispatches}>{children}</SortedDiaryDispatchContext.Provider>
    </SortedDiaryContext.Provider>
  );
}
