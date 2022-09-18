import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DiaryDataContext, DiaryDispatchContext } from 'stores/DiaryDataProvider';
import MyHeader from 'components/MyHeader';
import MyButton from 'components/MyButton';
import DiaryEditor from 'components/DiaryEditor';

export default function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const diaryList = useContext(DiaryDataContext);
  const { onRemove } = useContext(DiaryDispatchContext);
  const [originData, setOriginData] = useState();

  useEffect(() => {
    if (!diaryList.length) return navigate('/', { replace: true });
    const targetDiary = diaryList.find(it => Number(it.id) === Number(id));
    if (!targetDiary) return navigate('/', { replace: true });
    setOriginData(targetDiary);
  }, [id, diaryList]);

  const handleRemoveClick = () => {
    if (window.confirm('일기를 삭제하시겠습니까?')) {
      onRemove({ targetId: Number(id) });
      navigate('/', { replace: true });
    }
  };

  return (
    <div>
      <MyHeader
        headText={'일기 수정하기'}
        leftChild={<MyButton text={'< 뒤로 가기'} onClick={() => navigate(-1)} />}
        rightChild={<MyButton text={'삭제하기'} type={'negative'} onClick={handleRemoveClick} />}
      />
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
}
