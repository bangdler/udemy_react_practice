import { useNavigate, useSearchParams } from 'react-router-dom';

export default function Edit() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get('id');
  return (
    <>
      <div>Edit query string: {id}</div>
      <button onClick={() => setSearchParams({ id: 'bangdler' })}>qs 바꾸기</button>
      <button onClick={() => navigate('/')}>home 으로 가기</button>
    </>
  );
}
