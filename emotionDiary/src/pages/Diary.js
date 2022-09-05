import { useParams } from 'react-router-dom';

export default function Diary() {
  const { id } = useParams();

  return <div>Diary {id}</div>;
}
