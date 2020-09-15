import React, { useEffect } from 'react';
import css from './navegation.module.css';

export default function Navegation({
  onChangeSelect,
  allYearMonths,
  selectedDate,
}) {
  const dates = allYearMonths.map((item) => {
    return item.yearMonth;
  });

  const yearMonths = dates.filter((item, index) => {
    return dates.indexOf(item) === index;
  });

  const handleChange = (event) => {
    const date = event.target.value;
    onChangeSelect(date);
  };

  const previousClick = () => {
    document.querySelector('#nextButton').disabled = false;
    const previousDate = yearMonths.indexOf(selectedDate) - 1;
    const select = document.querySelector('select');

    if (previousDate >= 0) {
      onChangeSelect(yearMonths[previousDate]);
      select.value = yearMonths[previousDate];
      if (previousDate === 0) {
        document.querySelector('#previousButton').disabled = true;
      }
    }
  };

  const nextClick = () => {
    document.querySelector('#previousButton').disabled = false;
    const nextDate = yearMonths.indexOf(selectedDate) + 1;
    const select = document.querySelector('select');

    if (nextDate <= yearMonths.length) {
      onChangeSelect(yearMonths[nextDate]);
      select.value = yearMonths[nextDate];
      if (nextDate + 1 === yearMonths.length) {
        document.querySelector('#nextButton').disabled = true;
      }
    }
    console.log(nextDate);
  };

  useEffect(() => {
    onChangeSelect('2019-01');
  }, []);

  return (
    <div className={css.flexRow}>
      <button
        className="waves-light btn"
        onClick={previousClick}
        id="previousButton"
        style={{ margin: '4px' }}
      >
        Anterior
      </button>

      <div className="input-field col s12">
        <select
          className="browser-default"
          onChange={handleChange}
          style={{ margin: '4px' }}
        >
          {yearMonths.map((yearMonth, index) => {
            return (
              <option key={index} value={yearMonth}>
                {yearMonth}
              </option>
            );
          })}
        </select>
      </div>

      <button
        className="waves-light btn"
        onClick={nextClick}
        id="nextButton"
        style={{ margin: '15px' }}
      >
        Próximo
      </button>
    </div>
  );
}
