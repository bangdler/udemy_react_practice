import { useRef, useState } from 'react';

const DiaryItem = ({ id, author, contents, emotion, createdDate, onRemove, onEdit }) => {
  const [isEditContents, setIsEditContents] = useState(false);
  const [isEditInfo, setIsEditInfo] = useState(false);
  const [localContents, setLocalContents] = useState(contents);
  const [inputCheck, setInputCheck] = useState(true);
  const localContentsInput = useRef();

  const toggleIsEdit = () => setIsEditContents(!isEditContents);

  const handleChange = ({ target }) => {
    setLocalContents(target.value);
    setInputCheck(true);
  };
  const handleQuitEdit = () => {
    setIsEditContents(false);
    setLocalContents(contents);
  };

  const handleRemove = () => {
    if (window.confirm(`해당 일기를 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  };

  const handleEdit = () => {
    if (localContents.length < 5) {
      localContentsInput.current.focus();
      setInputCheck(false);
    }
    if (window.confirm(`해당 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContents);
      toggleIsEdit();
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
      <div className="contents">
        {isEditContents ? (
          <textarea ref={localContentsInput} onChange={handleChange} value={localContents} />
        ) : (
          contents
        )}
        <p>{inputCheck ? '' : '5글자 이상 입력해주세요!'}</p>
      </div>

      {isEditContents ? (
        <>
          <button onClick={handleQuitEdit}>취소</button>
          <button onClick={handleEdit}>완료</button>
        </>
      ) : (
        <>
          <button onClick={handleRemove}>삭제</button>
          <button onClick={toggleIsEdit}>수정</button>
        </>
      )}
    </div>
  );
};

export default DiaryItem;
