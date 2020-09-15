import React, { useState, useEffect } from 'react';
import transactionService from '../services/transactionService';
import Modal from 'react-modal';
import css from './update.module.css';

Modal.setAppElement('#root');

export default function Update({
  id,
  category,
  description,
  value,
  type,
  yearMonthDay,
  yearMonth,
  onChangeSelect,
}) {
  const [txtyearMonthDay, settxtYearMonthDay] = useState(yearMonthDay);
  const [txttype, settxtType] = useState(type);
  const [txtvalue, settxtValue] = useState(value);
  const [txtdescription, settxtDescription] = useState(description);
  const [txtcategory, settxtCategory] = useState(category);
  const [modelIsOpen, setModelIsOpen] = useState(false);
  const [updateTransaction, setUpdateTransaction] = useState([]);

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
    setUpdateTransaction(newData);
    // return () => {
    //   return clearInterval();
    // };
  }, []);

  const newUpdate = async (data) => {
    console.log(id);
    const res = await transactionService.update(id, data);
    const updatedTransaction = await res.data;

    console.log(updatedTransaction);
    onChangeSelect(yearMonth);
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
    updateTransaction.type = txttype;
    updateTransaction.description = txtdescription;
    updateTransaction.category = txtcategory;
    updateTransaction.value = Number(txtvalue);
    updateDate(txtyearMonthDay);

    console.log(updateTransaction);

    newUpdate(updateTransaction);

    event.preventDefault();
  };

  const handleRadioDespesa = (event) => {
    const type = event.target.value;
    settxtType(type);

    updateTransaction.type = type;
  };

  const handleRadioReceita = (event) => {
    const type = event.target.value;
    settxtType(type);
    updateTransaction.type = type;
  };

  const handleDescription = (event) => {
    const text = event.target.value;
    settxtDescription(text);
    updateTransaction.description = text;
  };

  const handleCategory = (event) => {
    const category = event.target.value;
    settxtCategory(category);
    updateTransaction.category = category;
  };

  const handleValue = (event) => {
    const price = event.target.value;
    settxtValue(price);
    updateTransaction.value = Number(price);
  };

  const handleDate = (event) => {
    const newDate = event.target.value;
    updateDate(newDate);
  };
  const updateDate = (newDate) => {
    settxtYearMonthDay(newDate);
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

    updateTransaction.year = Number(year);
    updateTransaction.month = Number(month);
    updateTransaction.day = Number(day);
    updateTransaction.yearMonth = yearMonth;
    updateTransaction.yearMonthDay = newDate;
  };

  return (
    <div>
      <i
        style={{ cursor: 'pointer' }}
        className="small material-icons"
        onClick={() => setModelIsOpen(true)}
      >
        edit
      </i>
      <Modal
        style={customStyles}
        isOpen={modelIsOpen}
        onRequestClose={() => setModelIsOpen(false)}
      >
        <h4>Edição de Lançamento</h4>
        <form
          className={css.formulario}
          onSubmit={handleSubmit}
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
                value={txtdescription}
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
                value={txtcategory}
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
                step="0.1"
                onChange={handleValue}
                value={txtvalue}
              />
            </label>
            <label>
              <input
                type="date"
                name="data"
                id="data"
                onChange={handleDate}
                value={txtyearMonthDay}
                style={{ width: '50%', marginLeft: '10px' }}
              />
            </label>
          </div>

          <div style={{ marginTop: '10px' }}>
            <input type="submit" value="Enviar" className="waves-light btn" />
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
