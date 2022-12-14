import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SortedDiaryContext } from 'stores/SortedDiaryProvider';
import ControlMenu from 'components/ControlMenu';
import MyButton from 'components/MyButton';
import DiaryItem from 'components/DiaryItem';

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
  const navigate = useNavigate();
  const sortedDiaryList = useContext(SortedDiaryContext);

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu initialSelectedValue={'LATEST'} OptionList={sortTimeOptionList} />
          <ControlMenu initialSelectedValue={'ALL'} OptionList={sortEmotionOptionList} />
        </div>
        <div className="right_col">
          <MyButton type={'positive'} text={'새 일기 쓰기'} onClick={() => navigate('/new')} />
        </div>
      </div>
      <div>
        {sortedDiaryList.map(it => (
          <DiaryItem key={it.id} {...it} />
        ))}
      </div>
    </div>
  );
}
