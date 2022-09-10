import { useContext, useState } from 'react';
import { LATEST, OLDEST } from 'utils/constants';
import { SortedDiaryDispatchContext } from 'stores/SortedDiaryProvider';

export default function ControlMenu({ OptionList }) {
  const [selectValue, setSelectValue] = useState(LATEST);
  const { sortLatest, sortOldest } = useContext(SortedDiaryDispatchContext);

  const handleChange = ({ target }) => {
    if (target.value === LATEST) {
      setSelectValue(LATEST);
      sortLatest();
    } else if (target.value === OLDEST) {
      setSelectValue(OLDEST);
      sortOldest();
    }
  };
  return (
    <select value={selectValue} onChange={handleChange}>
      {OptionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
}
