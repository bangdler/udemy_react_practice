import React, { useEffect, useRef, useState } from 'react';
import { emotions } from './constants';

const DiaryItem = ({ id, author, contents, emotion, createdDate, onRemove, onEdit }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [localState, setLocalState] = useState({ author, contents, emotion });
  const [textareaCheck, setTextareaCheck] = useState(true);
  const [inputCheck, setInputCheck] = useState(true);
  const localContentsInput = useRef();
  const localAuthorInput = useRef();

  useEffect(() => console.log('item render', id));

  const toggleIsEdit = () => setIsEdit(!isEdit);

  const handleInputChange = ({ target }) => {
    setLocalState(prev => ({ ...prev, author: target.value }));
    setInputCheck(true);
  };
  const handleTextareaChange = ({ target }) => {
    setLocalState(prev => ({ ...prev, contents: target.value }));
    setTextareaCheck(true);
  };

  const handleEmotionChange = ({ target }) => {
    setLocalState(prev => ({ ...prev, emotion: target.value }));
  };
  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalState({ author, contents, emotion });
  };

  const handleRemove = () => {
    if (window.confirm(`해당 일기를 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  };

  const handleEdit = () => {
    if (localState.contents.length < 5) {
      localContentsInput.current.focus();
      setTextareaCheck(false);
    }
    if (localState.author.length < 1) {
      localAuthorInput.current.focus();
      setInputCheck(false);
    }
    if (localState.author.length >= 1 && localState.contents.length >= 5) {
      if (window.confirm(`해당 일기를 수정하시겠습니까?`)) {
        onEdit(id, { newAuthor: localState.author, newContents: localState.contents, newEmotion: localState.emotion });
        toggleIsEdit();
      }
    }
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          {isEdit ? (
            <>
              <input ref={localAuthorInput} value={localState.author} onChange={handleInputChange} />
              <select onChange={handleEmotionChange} value={localState.emotion}>
                {emotions.map(emotion => (
                  <option key={emotion} value={emotion}>
                    {emotion}
                  </option>
                ))}
              </select>
            </>
          ) : (
            `작성자: ${author} ⎜ 감정: ${emotion}`
          )}
        </span>
        <p>{inputCheck ? '' : '1글자 이상 입력해주세요!'}</p>
        <div className="date">작성일자: {new Date(createdDate).toLocaleDateString()}</div>
      </div>
      <div className="contents">
        {isEdit ? (
          <textarea ref={localContentsInput} onChange={handleTextareaChange} value={localState.contents} />
        ) : (
          contents
        )}
        <p>{textareaCheck ? '' : '5글자 이상 입력해주세요!'}</p>
      </div>

      {isEdit ? (
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

const areEqual = (prevProps, nextProps) => {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
};

export const MemoizedDiaryItem = React.memo(DiaryItem, areEqual);
// 함수 외부에서 별도로 선언해줘야 함.
