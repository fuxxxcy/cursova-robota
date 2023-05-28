import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./StyledAddRows.css";

const CreateDCO = () => {
  const navigate = useNavigate();

  const [date, setDate] = useState<string>("");
  const [EDRPOU, setEDRPOU] = useState<string>("");
  const [basis, setBasis] = useState<string>("");
  const [sum, setSum] = useState<number | undefined>(undefined);
  const [corespondingAccount, setCorespondingAccount] = useState<string>("");
  const [destinationCode, setDestinationCode] = useState<string | null>(null);
  const [analyticalAccountingCode, setAnalyticalAccountingCode] = useState<string | null>(null);
  const [sender, setSender] = useState<number | undefined>(undefined);
  const [receiver, setReceiver] = useState<number | undefined>(undefined);

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    if (date === ""
      || EDRPOU === "" 
      || basis === "" 
      || sum === undefined
      || corespondingAccount === "" 
      || sender === undefined 
      || receiver === undefined
    ) {
      console.error("Неправильні дані");
      return;
    }

    fetch('http://localhost:4000/api/dco/add/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ date, EDRPOU, basis, sum, corespondingAccount, destinationCode, analyticalAccountingCode, sender, receiver })
    })
    .then(response => {
      if (response.ok) {
        console.log('Дані успішно додані');
        navigate('/dco/');
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
      <h1 className="title">Новий видатковий касовий ордер</h1>
      <form className="styled-form" onSubmit={handleSubmit}>
        <input className="styled-input" value={date} type="date" name="date" placeholder="Дата" onChange={(e)=>{setDate(e.target.value)}} />
        <input className="styled-input" value={sum} type="number" name="sum" placeholder="Сума" onChange={(e)=>{setSum(parseInt(e.target.value))}} />
        <input className="styled-input" value={basis} type="text" name="basis" placeholder="Підстава" onChange={(e)=>{setBasis(e.target.value)}} />
        <input className="styled-input" value={sender} type="number" name="sender" placeholder="ID відправника" onChange={(e)=>{setSender(parseInt(e.target.value))}} />
        <input className="styled-input" value={receiver} type="number" name="receiver" placeholder="ID отримувача" onChange={(e)=>{setReceiver(parseInt(e.target.value))}} />
        <input className="styled-input" value={corespondingAccount} type="text" name="corespondingAccount" placeholder="Субрахунок" onChange={(e)=>{setCorespondingAccount(e.target.value)}} />
        <input className="styled-input" value={EDRPOU} type="text" name="EDRPOU" placeholder="ЄДРПЕОУ" onChange={(e)=>{setEDRPOU(e.target.value)}} />
        <div className="collapse">
          <button className="styled-form-button" type="submit">Зберегти</button>
          <button className="styled-form-button" type="reset">Очистити</button>
        </div>
      </form>
    </div>
  );
};

export default CreateDCO;
