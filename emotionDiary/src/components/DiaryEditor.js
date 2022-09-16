import { useState } from 'react';
import { getStringDate } from 'utils/diaryUtill';

export default function DiaryEditor() {
  const [date, setDate] = useState(getStringDate(new Date()));

  return (
    <div className="DiaryEditor">
      <section>
        <h4>오늘은 언제인가요?</h4>
        <div className="input_box">
          <input className="input_date" type="date" value={date} onChange={e => setDate(e.target.value)} />
        </div>
      </section>
    </div>
  );
}
