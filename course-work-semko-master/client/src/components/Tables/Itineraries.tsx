import React from "react";
import "./StyledTable.css";
import Message from "../Message";
import { AddItineraries } from "../../db/Driver";
import RowDeleteButton from "./RowDeleteButton";
import ApiContext from "src/db/ApiContext";

export type Itinerary = {
  id: number;
  number: number;
  name: string;
};

interface StateProps {
  rows: JSX.Element[];
  isLoaded: boolean;
};

export default class ItinerariesTable extends React.Component {
  state: StateProps = { 
    rows: [],
    isLoaded: false 
  };

  ItinetrariesTableRow: React.FC<Itinerary> = ({ id, number, name }) => {
    const { apiBaseUrl } = React.useContext(ApiContext);
    return (
      <>
        <div>{id}</div>
        <div>{number}</div>
        <div>{name}</div>
        <RowDeleteButton request={`${apiBaseUrl}/itineraries/d/${id}`} />
      </>
    );
  };
  
  AllItems = async () => {
    const items = await AddItineraries();
    return items.map((props, idx) => {
      return (<div className="table-row" style={{gridTemplateColumns: "10% 10% calc(80% - 70px) 70px"}} key={idx}>
        <this.ItinetrariesTableRow id={props.id} number={props.number} name={props.name} />
      </div>);
    });
  };

  async componentDidMount() {
    const cashiers = await this.AllItems();
    this.setState({ rows: cashiers, isLoaded: true });
  };

  render() {
    const { rows, isLoaded } = this.state;
    return (
    !isLoaded ? (
      <Message title="Завантаження..." text="Зачекайте, поки не завантажаться усі дані" />
      ) : rows.length === 0 ? (
      <Message title="Тут пусто" text="Схоже, тут немає ніяких даних" />
      ) : (
        <>
          <p className="title">Маршрути</p>
          <div className="table">
            <div className="table-title" style={{gridTemplateColumns: "10% 10% calc(80% - 70px) 70px"}}>
              <div>ID</div>
              <div>Номер</div>
              <div>Назва</div>
            </div>
              {rows}
            <div className="table-end" onLoad={()=>{AddItineraries()}}>
              <span>Showed {rows.length} rows</span>
              <a className="add-button" href="add/">Додати новий рядок</a>
            </div>
          </div>
        </>
      )
    )
  }
};