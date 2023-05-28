import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./StyledAddRows.css";

const CreateChecklist = () => {
  const navigate = useNavigate();

  const [date, setDate] = useState<string>("");
  const [conductorId, setConductorId] = useState<number | undefined>(undefined);
  const [itineraryId, setItineraryId] = useState<number | undefined>(undefined);
  const [issued, setIssued] = useState<number | undefined>(undefined);
  const [returned, setReturned] = useState<number | undefined>(undefined);
  const [receipts, setReceipts] = useState<number | undefined>(undefined);
  const [cashierId, setCashierId] = useState<number | undefined>(undefined);

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    if (date === ""
      || conductorId === undefined 
      || itineraryId === undefined 
      || issued === undefined
      || returned === undefined 
      || receipts === undefined
      || cashierId === undefined
    ) {
      console.error("Неправильні дані");
      return;
    }

    fetch('http://localhost:4000/api/checklists/add/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ date, issued, returned, receipts, itineraryId, conductorId, cashierId })
    })
    .then(response => {
      if (response.ok) {
        console.log('Дані успішно додані');
        navigate('/checklists/');
      } else {
        console.error('Помилка додавання працівника');
      }
      
    })
    .catch(error => {
      console.error('Помилка додавання працівника:', error);
    });
  };

  return (
    <div className="form-layout">
      <h1 className="title">Новий контрольний лист</h1>
      <form className="styled-form" onSubmit={handleSubmit}>
        <input className="styled-input" value={date} type="date" name="date" placeholder="Дата" onChange={(e)=>{setDate(e.target.value)}} />
        <input className="styled-input" value={issued} type="number" name="issued" placeholder="Видано квитків" onChange={(e)=>{setIssued(parseInt(e.target.value))}} />
        <input className="styled-input" value={returned} type="number" name="returned" placeholder="Повернено квитків" onChange={(e)=>{setReturned(parseInt(e.target.value))}} />
        <input className="styled-input" value={receipts} type="number" name="receipts" placeholder="Виручка" onChange={(e)=>{setReceipts(parseInt(e.target.value))}} />
        <input className="styled-input" value={conductorId} type="number" name="conductorId" placeholder="ID кондуктора" onChange={(e)=>{setConductorId(parseInt(e.target.value))}} />
        <input className="styled-input" value={cashierId} type="number" name="cashierId" placeholder="ID касира" onChange={(e)=>{setCashierId(parseInt(e.target.value))}} />
        <input className="styled-input" value={itineraryId} type="number" name="itineraryId" placeholder="ID маршруту" onChange={(e)=>{setItineraryId(parseInt(e.target.value))}} />
        <div className="collapse">
          <button className="styled-form-button" type="submit">Зберегти</button>
          <button className="styled-form-button" type="reset">Очистити</button>
        </div>
      </form>
    </div>
  );
};

export default CreateChecklist;
