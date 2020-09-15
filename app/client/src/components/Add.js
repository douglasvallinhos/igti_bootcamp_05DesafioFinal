import React, { useState, useEffect } from 'react';
import transactionService from '../services/transactionService';
import Modal from 'react-modal';

import css from './add.module.css';

Modal.setAppElement('#root');

export default function Add({ onChangeSelect }) {
  const [modelIsOpen, setModelIsOpen] = useState(false);
  const [addTransaction, setAddTransaction] = useState([]);
  const [txttype, settxtType] = useState('-');

  const newData = {
    description: '',
    value: 0,
    category: '',
    year: 0,
    month: 0,
    day: 0,
    yearMonth: '',
    yearMonthDay: '',
    type: '',
  };

  useEffect(() => {
    setAddTransaction(newData);
  }, []);

  const add = async (data) => {
    const res = await transactionService.create(data);
    const addedTransaction = await res.data;

    console.log(addedTransaction);

    onChangeSelect(addTransaction.yearMonth);

    setModelIsOpen(false);
  };

  const customStyles = {
    content: {
      width: '400px',
      height: '450px',
      padding: '10px',
      position: 'absolute',
      top: '30%',
      left: '40%',
      marginTop: '-50px',
      marginLeft: '-50px',
    },
  };

  const handleSubmit = (event) => {
    console.log(addTransaction);
    addTransaction.type = txttype;
    add(addTransaction);

    event.preventDefault();
  };

  const handleRadioDespesa = (event) => {
    const type = event.target.value;
    settxtType(type);
    console.log(type);

    addTransaction.type = type;
  };

  const handleRadioReceita = (event) => {
    const type = event.target.value;
    settxtType(type);
    console.log(type);
    addTransaction.type = type;
  };

  const handleDescription = (event) => {
    const text = event.target.value;
    addTransaction.description = text;
  };

  const handleCategory = (event) => {
    const category = event.target.value;
    addTransaction.category = category;
  };

  const handleValue = (event) => {
    const price = event.target.value;
    addTransaction.value = Number(price);
  };

  const handleDate = (event) => {
    const newDate = event.target.value;
    let yearMonth = '';
    let year = '';
    let month = '';
    let day = '';

    for (let i = 0; i < newDate.length; i++) {
      if (i < 7) {
        yearMonth = yearMonth + newDate[i];
      }
      if (i < 4) {
        year = year + newDate[i];
      } else if (i > 4 && i < 7) {
        month = month + newDate[i];
      } else if (i > 7) {
        day = day + newDate[i];
      }
    }
    console.log(yearMonth);

    addTransaction.year = Number(year);
    addTransaction.month = Number(month);
    addTransaction.day = Number(day);
    addTransaction.yearMonth = yearMonth;
    addTransaction.yearMonthDay = newDate;
  };

  return (
    <div>
      <button
        className="waves-light btn"
        onClick={() => {
          setModelIsOpen(true);
        }}
      >
        + Novo Lançamento
      </button>
      <Modal
        style={customStyles}
        isOpen={modelIsOpen}
        onRequestClose={() => setModelIsOpen(false)}
      >
        <h4>Inclusão de Lançamento</h4>
        <form
          onSubmit={handleSubmit}
          className={css.formulario}
          style={{
            border: '1px solid black',
            padding: '10px',
            borderRadius: '10px',
          }}
        >
          <div className={css.radios}>
            <label>
              <input
                name="type"
                type="radio"
                value="+"
                onChange={handleRadioReceita}
                checked={txttype === '+' ? true : false}
              />
              <span style={{ color: 'green' }}>Receita</span>
            </label>
            <label>
              <input
                name="type"
                type="radio"
                value="-"
                onChange={handleRadioDespesa}
                checked={txttype === '-' ? true : false}
              />
              <span style={{ color: 'red' }}>Despesa</span>
            </label>
          </div>

          <div>
            <label>
              Descrição
              <input
                type="text"
                name="description"
                id="description"
                onChange={handleDescription}
                required
              />
            </label>
          </div>

          <div>
            <label>
              Categoria
              <input
                type="text"
                name="category"
                id="category"
                onChange={handleCategory}
                required
              />
            </label>
          </div>

          <div>
            <label>
              Valor R$
              <input
                style={{ width: '30%' }}
                type="number"
                name="value"
                id="value"
                step="0.01"
                onChange={handleValue}
                required
              />
            </label>
            <label>
              <input
                style={{ width: '50%', marginLeft: '10px' }}
                type="date"
                name="data"
                id="data"
                onChange={handleDate}
                required
              />
            </label>
          </div>

          <div style={{ marginTop: '10px' }}>
            <input className="waves-light btn" type="submit" value="Enviar" />
            <button
              style={{ marginLeft: '10px' }}
              className="waves-light btn red"
              onClick={() => setModelIsOpen(false)}
            >
              Fechar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
