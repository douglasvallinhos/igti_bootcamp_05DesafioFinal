import React, { useState, useEffect } from 'react';
import transactionService from './services/transactionService.js';
import Navegation from './components/Navegation.js';
import Filter from './components/Filter.js';

export default function App() {
  const [allYearMonths, setAllYearMonths] = useState([]);
  const [newYearMonth, setNewYearMonth] = useState('2019-01');
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [selectedDate, setSelectedDate] = useState('2019-01');

  useEffect(() => {
    const getTransactions = async () => {
      const res = await transactionService.getAll();
      let allYearMonths = await res.data;
      allYearMonths = allYearMonths.map(({ yearMonth }, index) => {
        return {
          id: index,
          yearMonth,
        };
      });
      setAllYearMonths(allYearMonths);
    };
    getTransactions();
  }, []);

  const handleChangeSelect = async (newDate) => {
    setNewYearMonth(newDate);
    const res = await transactionService.getByPeriod(newDate);
    let selectedTransactions = await res.data;

    selectedTransactions = selectedTransactions.transactions.map(
      (
        {
          _id,
          category,
          description,
          value,
          yearMonth,
          type,
          yearMonthDay,
          day,
        },
        index
      ) => {
        return {
          id: _id,
          category,
          description: description.toLowerCase(),
          value,
          yearMonth,
          type,
          yearMonthDay,
          day,
        };
      }
    );

    selectedTransactions = selectedTransactions.sort((a, b) => {
      return a.day - b.day;
    });

    setSelectedTransactions(selectedTransactions);
    setSelectedDate(newDate);
  };

  const handleFilterChange = (newText) => {
    console.log(newText);
  };

  return (
    <div className="container">
      <h2 className="center">Controle Financeiro Pessoal</h2>
      <Navegation
        allYearMonths={allYearMonths}
        onChangeSelect={handleChangeSelect}
        yearMonth={newYearMonth}
        selectedDate={selectedDate}
        selectedTransactions={selectedTransactions}
      />
      <Filter
        selectedTransactions={selectedTransactions}
        handleFilterChange={handleFilterChange}
        onChangeSelect={handleChangeSelect}
      />
    </div>
  );
}
