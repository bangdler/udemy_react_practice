import DiaryItem from './DiaryItem';

const DiaryList = ({ data, onRemove, onEdit }) => {
  return (
    <div className="DiaryList">
      <h2>일기리스트</h2>
      <div className="DiaryListContainer">
        <h4>{data.length}개의 일기가 있습니다.</h4>
        {data.map(diary => (
          <DiaryItem key={diary.id} onRemove={onRemove} onEdit={onEdit} {...diary} />
        ))}
      </div>
    </div>
  );
};

DiaryList.defaultProps = [];

export default DiaryList;
