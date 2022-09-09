import { useState } from 'react';

function ControlMenu({ sortType, onChange, OptionList }) {
  return (
    <select value={sortType} onChange={e => onChange(e.target.value)}>
      {OptionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
}

const LATEST = 'latest';
const OLDEST = 'oldest';

const sortOptionList = [
  { value: LATEST, name: '최신순' },
  { value: OLDEST, name: '오래된순' },
];

export default function DiaryList({ diaryList }) {
  const [sortType, setSortType] = useState(LATEST);

  const getSortedDiaryList = () => {
    const copyList = JSON.parse(JSON.stringify(diaryList));
    const compare = (a, b) => {
      if (sortType === LATEST) {
        return Number(b.date) - Number(a.date);
      }
      if (sortType === OLDEST) {
        return Number(a.date) - Number(b.date);
      }
    };
    return copyList.sort(compare);
  };
  return (
    <>
      <ControlMenu sortType={sortType} onChange={setSortType} OptionList={sortOptionList} />
      <div>
        {getSortedDiaryList().map(it => (
          <div key={it.id}>{it.contents}</div>
        ))}
      </div>
    </>
  );
}
