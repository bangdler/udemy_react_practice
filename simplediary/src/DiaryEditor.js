import React, { useContext, useRef, useState } from 'react';
import { emotions } from './constants';
import { DiaryDispatchContext } from './diaryContext';

const DiaryEditor = () => {
  const { onCreate } = useContext(DiaryDispatchContext);
  const [state, setState] = useState({ author: '', contents: '', emotion: emotions[0] });
  const [inputCheck, setInputCheck] = useState({ input: true, textarea: true });
  const authorInput = useRef();
  const contentsInput = useRef();

  const handleChange = e => {
    setState(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') return;
    setInputCheck(prev => ({ ...prev, [e.target.tagName.toLowerCase()]: true }));
  };

  const handleSubmit = () => {
    if (state.contents.length < 5) {
      contentsInput.current.focus();
      setInputCheck(prev => ({ ...prev, textarea: false }));
    }
    if (state.author.length < 1) {
      authorInput.current.focus();
      setInputCheck(prev => ({ ...prev, input: false }));
    }
    if (state.author.length >= 1 && state.contents.length >= 5) {
      onCreate(state.author, state.contents, state.emotion);
      setState({ author: '', contents: '', emotion: emotions[0] });
      alert('저장');
    }
  };

  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          ref={authorInput}
          placeholder="작성자를 입력해주세요."
          name="author"
          value={state.author}
          onChange={handleChange}
        />
        <p>{inputCheck.input ? '' : '1글자 이상 입력해주세요!'}</p>
      </div>
      <div>
        <textarea
          ref={contentsInput}
          placeholder="본문은 5글자 이상 입력해주세요."
          name="contents"
          value={state.contents}
          onChange={handleChange}
        />
        <p>{inputCheck.textarea ? '' : '5글자 이상 입력해주세요!'}</p>
      </div>
      <div>
        <span>오늘의 감정 점수 : </span>
        <select name="emotion" onChange={handleChange} value={state.emotion}>
          {emotions.map((emotion, idx) => (
            <option key={emotion} value={emotion}>
              {emotion}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>일기저장하기</button>
      </div>
    </div>
  );
};

export default React.memo(DiaryEditor);
