import { useContext, useEffect, useState } from 'react';
import { DiaryDataContext } from 'stores/DiaryDataProvider';
import SortedDiaryProvider from 'stores/SortedDiaryProvider';
import MyHeader from 'components/MyHeader';
import MyButton from 'components/MyButton';
import DiaryList from 'components/DiaryList';

export default function Home() {
  const diaryList = useContext(DiaryDataContext);
  const [curDate, setCurDate] = useState(new Date());
  const [curMonthDiaryList, setCurMonthDiaryList] = useState([]);

  useEffect(() => {
    if (!diaryList.length) return;
    const firstDayOfCurMonth = new Date(curDate.getFullYear(), curDate.getMonth(), 1).getTime();
    const lastDayOfCurMonth = new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0).getTime();
    setCurMonthDiaryList(diaryList.filter(it => firstDayOfCurMonth <= it.date && it.date <= lastDayOfCurMonth));
  }, [curDate, diaryList]);

  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  const increaseMonth = () => {
    setCurDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, prev.getDate()));
  };

  const decreaseMonth = () => {
    setCurDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, prev.getDate()));
  };
  return (
    <>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={'<'} onClick={decreaseMonth} />}
        rightChild={<MyButton text={'>'} onClick={increaseMonth} />}
      />
      <SortedDiaryProvider curMonthDiaryList={curMonthDiaryList}>
        <DiaryList />
      </SortedDiaryProvider>
    </>
  );
}
