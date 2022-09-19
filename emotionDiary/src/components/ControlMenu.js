import React, { useContext, useState } from 'react';
import { SortedDiaryDispatchContext } from 'stores/SortedDiaryProvider';

export default React.memo(function ControlMenu({ initialSelectedValue, OptionList }) {
  const [selectValue, setSelectValue] = useState(initialSelectedValue);
  const { sortLatest, sortOldest, sortAll, sortGood, sortBad } = useContext(SortedDiaryDispatchContext);

  const handleChange = ({ target }) => {
    if (target.value === 'LATEST') {
      setSelectValue('LATEST');
      sortLatest();
    } else if (target.value === 'OLDEST') {
      setSelectValue('OLDEST');
      sortOldest();
    } else if (target.value === 'ALL') {
      setSelectValue('ALL');
      sortAll();
    } else if (target.value === 'GOOD') {
      setSelectValue('GOOD');
      sortGood();
    } else if (target.value === 'BAD') {
      setSelectValue('BAD');
      sortBad();
    }
  };

  return (
    <select className="ControlMenu" value={selectValue} onChange={handleChange}>
      {OptionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
});
