import React from 'react';
import transactionService from '../services/transactionService.js';

export default function Delete({
  id,
  yearMonth,
  onChangeSelect,
  category,
  value,
  description,
}) {
  const removeOne = async () => {
    const confirmar = window.confirm(
      `Deletar o lançamento ${category}-${description}: R$${value} reais?`
    );
    console.log(id);
    if (confirmar === true) {
      await transactionService.remove(id);

      console.log('Transação removida!');

      onChangeSelect(yearMonth);
    }
  };
  return (
    <div>
      <i
        style={{ cursor: 'pointer' }}
        className="small material-icons"
        onClick={removeOne}
      >
        delete
      </i>
    </div>
  );
}
