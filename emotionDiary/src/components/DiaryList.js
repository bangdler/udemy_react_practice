import { useContext, useState } from 'react';
import ControlMenu from 'components/ControlMenu';
import { LATEST, OLDEST } from 'utils/constants';
import { SortedDiaryContext } from 'stores/SortedDiaryProvider';

const sortOptionList = [
  { value: LATEST, name: '최신순' },
  { value: OLDEST, name: '오래된순' },
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
      <ControlMenu OptionList={sortOptionList} />
      <div>
        {sortedDiaryList.map(it => (
          <div key={it.id}>{it.contents}</div>
        ))}
      </div>
    </>
  );
}
