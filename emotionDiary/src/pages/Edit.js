import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DiaryDataContext } from 'stores/DiaryDataProvider';
import MyHeader from 'components/MyHeader';
import MyButton from 'components/MyButton';
import DiaryEditor from 'components/DiaryEditor';

export default function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const diaryList = useContext(DiaryDataContext);
  const [originData, setOriginData] = useState();

  useEffect(() => {
    if (!diaryList.length) return navigate('/', { replace: true });
    const targetDiary = diaryList.find(it => Number(it.id) === Number(id));
    if (!targetDiary) return navigate('/', { replace: true });
    setOriginData(targetDiary);
  }, [id, diaryList]);

  return (
    <div>
      <MyHeader headText={'일기 수정하기'} leftChild={<MyButton text={'< 뒤로 가기'} onClick={() => navigate(-1)} />} />
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
}
