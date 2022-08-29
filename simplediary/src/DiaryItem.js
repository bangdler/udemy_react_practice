const DiaryItem = ({ id, author, contents, emotion, createdDate, onDelete }) => {
  const handleDeleteClick = () => {
    if (window.confirm(`해당 일기를 삭제하시겠습니까?`)) {
      onDelete(id);
    }
  };
  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자: {author} | 감정 점수: {emotion}점
        </span>
        <div className="date">작성일자: {new Date(createdDate).toLocaleDateString()}</div>
      </div>
      <div className="contents">내용: {contents}</div>
      <button onClick={handleDeleteClick}>삭제</button>
    </div>
  );
};

export default DiaryItem;
