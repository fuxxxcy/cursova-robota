import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./StyledAddRows.css";

const CreateItinerary = () => {
  const navigate = useNavigate();

  const [number, setNumber] = useState<number | undefined>(undefined);
  const [name, setName] = useState<string>("");

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    if (name === "" || number === undefined) {
      console.error("Неправильні дані");
      return;
    }

    fetch('http://localhost:4000/api/itineraries/add/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, number })
    })
    .then(response => {
      if (response.ok) {
        console.log('Дані успішно додані');
        navigate('/itineraries/');
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
      <h1 className="title">Новий маршрут</h1>
      <form className="styled-form" onSubmit={handleSubmit}>
        <input className="styled-input" value={number} type="number" name="position" placeholder="Номер" onChange={(e)=>{setNumber(parseInt(e.target.value))}} />
        <input className="styled-input" value={name} type="text" name="name" placeholder="Назва маршруту" onChange={(e)=>{setName(e.target.value)}} />
        <div className="collapse">
          <button className="styled-form-button" type="submit">Зберегти</button>
          <button className="styled-form-button" type="reset">Очистити</button>
        </div>
      </form>
    </div>
  );
};

export default CreateItinerary;
