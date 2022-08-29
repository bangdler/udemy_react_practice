import { useRef, useState } from 'react';

const DiaryEditor = ({ onCreate }) => {
  const [state, setState] = useState({ author: '', contents: '', emotion: 1 });
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
    if (state.author.length < 1) {
      authorInput.current.focus();
      setInputCheck(prev => ({ ...prev, input: false }));
    }
    if (state.contents.length < 5) {
      contentsInput.current.focus();
      setInputCheck(prev => ({ ...prev, textarea: false }));
    }
    if (state.author.length >= 1 && state.contents.length >= 5) {
      onCreate(state.author, state.contents, state.emotion);
      setState({ author: '', contents: '', emotion: 1 });
      alert('저장');
    }
  };

  const emotionNumbers = [1, 2, 3, 4, 5];

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
          {emotionNumbers.map((num, idx) => (
            <option key={idx} value={num}>
              {num}
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

export default DiaryEditor;
