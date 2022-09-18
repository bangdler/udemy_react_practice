import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DiaryDataContext } from 'stores/DiaryDataProvider';
import MyHeader from 'components/MyHeader';
import MyButton from 'components/MyButton';
import { getStringDate } from 'utils/diaryUtill';
import { EMOTION_LIST } from 'utils/constants';

export default function Diary() {
  const navigate = useNavigate();
  const { id } = useParams();
  const diaryList = useContext(DiaryDataContext);
  const [data, setData] = useState();

  useEffect(() => {
    if (!diaryList.length) return navigate('/', { replace: true });
    const targetDiary = diaryList.find(it => Number(it.id) === Number(id));
    if (!targetDiary) return navigate('/', { replace: true });
    setData(targetDiary);
  }, [id, diaryList]);

  const curEmotion = data ? EMOTION_LIST.find(it => Number(it.emotion_id) === Number(data.id)) : false;

  return data ? (
    <div className="DiaryPage">
      <MyHeader
        headText={`${getStringDate(new Date(data.date))} 일기`}
        leftChild={<MyButton text={'< 뒤로가기'} onClick={() => navigate(-1)} />}
        rightChild={<MyButton text={'수정하기'} onClick={() => navigate(`/edit/${data.id}`)} />}
      />
      <article>
        <section>
          <h4>오늘의 감정</h4>
          <div className={['diary_img_wrapper', `diary_img_wrapper_${curEmotion.emotion_id}`].join(' ')}>
            <img src={curEmotion.emotion_img} alt={curEmotion.emotion_description} />
            <div className="emotion_description">{curEmotion.emotion_description}</div>
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="diary_contents_wrapper">
            <p>{data.contents}</p>
          </div>
        </section>
      </article>
    </div>
  ) : (
    <div className="DiaryPage">Diary 로딩 중입니다...</div>
  );
}
