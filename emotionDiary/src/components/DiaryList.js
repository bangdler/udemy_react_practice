import { useContext, useState } from 'react';
import ControlMenu from 'components/ControlMenu';
import { SortedDiaryContext } from 'stores/SortedDiaryProvider';

const sortTimeOptionList = [
  { value: 'LATEST', name: '최신순' },
  { value: 'OLDEST', name: '오래된순' },
];

const sortEmotionOptionList = [
  { value: 'ALL', name: '전부다' },
  { value: 'GOOD', name: '좋은 감정만' },
  { value: 'BAD', name: '나쁜 감정만' },
];

export default function DiaryList() {
  // const [sortType, setSortType] = useState(LATEST);
  //
  // const getSortedDiaryList = () => {
  //   const copyList = JSON.parse(JSON.stringify(diaryList));
  //   const compare = (a, b) => {
  //     if (sortType === LATEST) {
  //       return Number(b.date) - Number(a.date);
  //     }
  //     if (sortType === OLDEST) {
  //       return Number(a.date) - Number(b.date);
  //     }
  //   };
  //   return copyList.sort(compare);
  // };

  const sortedDiaryList = useContext(SortedDiaryContext);

  return (
    <>
      <ControlMenu initialSelectedValue={'LATEST'} OptionList={sortTimeOptionList} />
      <ControlMenu initialSelectedValue={'ALL'} OptionList={sortEmotionOptionList} />
      <div>
        {sortedDiaryList.map(it => (
          <div key={it.id}>{it.contents}</div>
        ))}
      </div>
    </>
  );
}
