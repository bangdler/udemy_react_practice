import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MyHeader from 'components/MyHeader';
import MyButton from 'components/MyButton';
import DiaryEditor from 'components/DiaryEditor';

export default function New() {
  const navigate = useNavigate();

  useEffect(() => {
    const $title = document.getElementsByTagName('title')[0];
    $title.innerHTML = '감정 일기장 - 쓰기';
  }, []);

  return (
    <div>
      <MyHeader
        headText={'새로운 일기 쓰기'}
        leftChild={<MyButton text={'< 뒤로 가기'} onClick={() => navigate(-1)} />}
      />
      <DiaryEditor />
    </div>
  );
}
