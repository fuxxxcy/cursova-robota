import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./StyledAddRows.css";

const CreateEmployee = () => {
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [position, setPosition] = useState<string>("");

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    if (name === "" || position === "") {
      console.error("Неправильні дані");
      return;
    }

    fetch('http://localhost:4000/api/employees/add/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, position })
    })
    .then(response => {
      if (response.ok) {
        console.log('Дані успішно додані');
        navigate('/employees/');
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
      <h1 className="title">Новий працівник</h1>
      <form className="styled-form" onSubmit={handleSubmit}>
        <input className="styled-input" value={name} type="text" name="name" placeholder="Ім'я" onChange={(e)=>{setName(e.target.value)}} />
        <input className="styled-input" value={position} type="text" name="position" placeholder="Посада" onChange={(e)=>{setPosition(e.target.value)}} />
        <div className="collapse">
          <button className="styled-form-button" type="submit">Зберегти</button>
          <button className="styled-form-button" type="reset">Очистити</button>
        </div>
      </form>
    </div>
  );
};

export default CreateEmployee;
