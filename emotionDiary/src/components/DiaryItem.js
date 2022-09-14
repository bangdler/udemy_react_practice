import { useNavigate } from 'react-router-dom';
import { PUBLIC_URL } from 'utils/constants';
import MyButton from 'components/MyButton';

export default function DiaryItem({ id, contents, emotion, date }) {
  const navigate = useNavigate();
  const strDate = new Date(date).toLocaleDateString();
  const goDetail = () => navigate(`/diary/${id}`);
  const goEdit = () => navigate(`/edit/${id}`);

  return (
    <div className="DiaryItem">
      <div className={['emotion_img_wrapper', `emotion_img_wrapper_${emotion}`].join(' ')} onClick={goDetail}>
        <img alt={`emotion_img${emotion}`} src={PUBLIC_URL + `/assets/emotion${emotion}.png`} />
      </div>
      <div className="info_wrapper" onClick={goDetail}>
        <div className="diary_date">{strDate}</div>
        <div className="diary_contents_preview">{contents}</div>
      </div>
      <div className="button_wrapper">
        <MyButton onClick={goEdit} text="수정하기" />
      </div>
    </div>
  );
}
