import DiaryItem from './DiaryItem';
import React, { useContext, useMemo } from 'react';
import { DiaryStateContext } from './diaryContext';

const DiaryList = ({ onRemove, onEdit }) => {
  const data = useContext(DiaryStateContext);

  const getRecent2daysDiary = useMemo(() => {
    const today = new Date().setHours(0, 0, 0, 0);
    const numOfRecentDiary = data.filter(it => {
      const curDate = new Date(it.createdDate).setHours(0, 0, 0, 0);
      const diff = today - curDate;
      return diff < 2 * 24 * 60 * 60 * 1000; // 2일 차이까지
    }).length;
    return numOfRecentDiary;
  }, [data.length]);

  return (
    <div className="DiaryList">
      <h2>일기리스트</h2>
      <div className="DiaryListContainer">
        <h4>{data.length}개의 일기가 있습니다.</h4>
        <h4>최근 2일 간 작성한 일기 개수 : {getRecent2daysDiary}</h4>
        {data.map(diary => (
          <DiaryItem key={diary.id} onRemove={onRemove} onEdit={onEdit} {...diary} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
