import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DiaryDispatchContext } from 'stores/DiaryDataProvider';
import { getStringDate } from 'utils/diaryUtill';
import { EMOTION_LIST } from 'utils/constants';
import EmotionItem from 'components/EmotionItem';
import MyButton from 'components/MyButton';

export default function DiaryEditor({ isEdit, originData }) {
  const [date, setDate] = useState(getStringDate(new Date()));
  const [emotion, setEmotion] = useState(3);
  const [contents, setContents] = useState('');
  const { onCreate, onEdit } = useContext(DiaryDispatchContext);
  const contentsRef = useRef();
  const navigate = useNavigate();

  const handleChangeDate = ({ target }) => setDate(target.value);

  const handleClickEmotion = emotion => setEmotion(emotion);

  const handleChangeContents = ({ target }) => setContents(target.value);

  const handleSubmit = () => {
    if (contents.length < 1) {
      contentsRef.current.focus();
      return;
    }
    if (window.confirm(isEdit ? '일기를 수정하시겠습니까?' : '새로운 일기를 작성하시겠습니까?')) {
      isEdit ? onEdit({ targetId: originData.id, date, emotion, contents }) : onCreate({ date, emotion, contents });
      navigate('/', { replace: true });
    }
  };

  useEffect(() => {
    if (!isEdit) return;
    setDate(getStringDate(new Date(Number(originData.date))));
    setEmotion(originData.emotion);
    setContents(originData.contents);
  }, [isEdit, originData]);

  return (
    <div className="DiaryEditor">
      <section>
        <h4>오늘은 언제인가요?</h4>
        <div className="input_box">
          <input className="input_date" type="date" value={date} onChange={handleChangeDate} />
        </div>
      </section>
      <section>
        <h4>오늘의 감정</h4>
        <div className="emotion_list_wrapper">
          {EMOTION_LIST.map(it => (
            <EmotionItem
              key={it.emotion_id}
              {...it}
              onClick={handleClickEmotion}
              isSelected={it.emotion_id === emotion}
            />
          ))}
        </div>
      </section>
      <section>
        <h4>오늘의 일기</h4>
        <div className="text_wrapper">
          <textarea
            value={contents}
            onChange={handleChangeContents}
            ref={contentsRef}
            placeholder="오늘은 어땠나요? (1글자 이상 입력해주세요.)"
          />
        </div>
      </section>
      <section>
        <div className="control_box">
          <MyButton text={'취소하기'} onClick={() => navigate(-1)} />
          <MyButton text={'작성완료'} type={'positive'} onClick={handleSubmit} />
        </div>
      </section>
    </div>
  );
}
