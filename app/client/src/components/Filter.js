import React, { useState, useEffect } from 'react';
import css from './filter.module.css';
import Add from './Add';
import Update from './Update';
import Delete from './Delete';
import { formatNumber } from '../helpers/formatHelpers.js';

export default function Filter({ selectedTransactions, onChangeSelect }) {
  const [newTransactions, setNewTransactions] = useState([]);
  const [yearMonth, setyearMonth] = useState('');

  useEffect(() => {
    setNewTransactions(selectedTransactions);
  }, [selectedTransactions]);

  const onFilterChange = (event) => {
    const newText = event.target.value;

    const filteredTransactions = selectedTransactions.filter((transaction) => {
      return transaction.description.includes(newText.toLowerCase());
    });

    setNewTransactions(filteredTransactions);
  };

  const receitas = newTransactions.reduce((accumulator, currentItem) => {
    let temp = 0;
    //console.log('accumulator: ' + accumulator);
    if (currentItem.type === '+') {
      temp = temp + currentItem.value;
    }
    return accumulator + temp;
  }, 0);

  const despesas = newTransactions.reduce((accumulator, currentItem) => {
    let temp = 0;
    if (currentItem.type === '-') {
      temp = temp + currentItem.value;
    }
    return accumulator + temp;
  }, 0);

  const saldo = receitas - despesas;

  return (
    <div>
      <div className={css.flexRow}>
        <div>
          {' '}
          <span style={{ fontWeight: 'bold' }}>Lançamentos:</span>{' '}
          {newTransactions.length}
        </div>
        <div>
          <span style={{ fontWeight: 'bold' }}>Receitas:</span>{' '}
          <span style={{ color: 'green' }}>R$ {formatNumber(receitas)}</span>
        </div>
        <div>
          <span style={{ fontWeight: 'bold' }}>Despesas:</span>{' '}
          <span style={{ color: 'red' }}>R$ {formatNumber(despesas)}</span>{' '}
        </div>
        <div>
          <span style={{ fontWeight: 'bold' }}>Saldo:</span>{' '}
          <span style={saldo >= 0 ? { color: 'green' } : { color: 'red' }}>
            R$ {formatNumber(saldo)}
          </span>{' '}
        </div>
      </div>

      <div className={css.lancamentoFiltro}>
        <Add onChangeSelect={onChangeSelect} />
        <div>
          <input
            className={css.inputFilter}
            onChange={onFilterChange}
            type="text"
            placeholder="Filtro"
          />
        </div>
      </div>

      <div id="list">
        {newTransactions.map(
          ({
            id,
            category,
            description,
            value,
            yearMonth,
            type,
            yearMonthDay,
            day,
          }) => {
            return (
              <div
                key={id}
                className={
                  type === '+' ? css.transactionsGreen : css.transactionsRed
                }
              >
                <div className={css.dayCategoryDescription}>
                  <p className={css.day}>{day}</p>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '1.2em' }}>
                      {category}
                    </span>
                    <span>{description}</span>
                  </div>
                </div>

                <div className={css.valueEditDelete}>
                  <span style={{ fontSize: '1.8em', marginRight: '50px' }}>
                    R$ {formatNumber(value)}
                  </span>
                  <Update
                    id={id}
                    category={category}
                    description={description}
                    value={value}
                    type={type}
                    yearMonthDay={yearMonthDay}
                    yearMonth={yearMonth}
                    onChangeSelect={onChangeSelect}
                  />
                  <Delete
                    id={id}
                    yearMonth={yearMonth}
                    onChangeSelect={onChangeSelect}
                    category={category}
                    value={formatNumber(value)}
                    description={description}
                  />
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
