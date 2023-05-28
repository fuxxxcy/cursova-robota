import React from "react";
import "./StyledTable.css";
import Message from "../Message";
import { AddChecklists } from "../../db/Driver";
import RowDeleteButton from "./RowDeleteButton";
import ApiContext from "src/db/ApiContext";

export type Checklist = {
  id: number, 
  date: string, 
  conductor: string, 
  itinerary: string, 
  issued: number, 
  returned: number, 
  receipts: number, 
  cashier: string
};

interface StateProps {
  rows: JSX.Element[];
  isLoaded: boolean;
};

export default class ChecklistsTable extends React.Component {
  state: StateProps = { 
    rows: [],
    isLoaded: false 
  };

  ChecklistsTableRow: React.FC<Checklist> = ({ id, date, conductor, itinerary, issued, returned, receipts, cashier }) => {
    const { apiBaseUrl } = React.useContext(ApiContext);
    return (
      <>
        <div>{id}</div>
        <div>{date}</div>
        <div>{conductor}</div>
        <div>{itinerary}</div>
        <div>{issued}</div>
        <div>{returned}</div>
        <div>{receipts}</div>
        <div>{cashier}</div>
        <RowDeleteButton request={`${apiBaseUrl}/checklists/d/${id}`} />
      </>
    );
  };
  
  AllItems = async () => {
    const items = await AddChecklists();
    return items.map((item, idx) => {
      return (<div className="table-row" style={{gridTemplateColumns: "5% 13% 19% 19% 8% 8% 8% calc(20% - 70px) 70px"}} key={idx}>
        <this.ChecklistsTableRow 
        id={item.id} 
        date={item.date}
        conductor={item.conductor} 
        itinerary={item.itinerary}
        issued={item.issued} 
        returned={item.returned}
        receipts={item.receipts} 
        cashier={item.cashier} 
         />
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
          <p className="title">Контрольні листи</p>
          <div className="table">
            <div className="table-title" style={{gridTemplateColumns: "5% 13% 19% 19% 8% 8% 8% calc(20% - 70px) 70px"}}>
              <div>ID</div>
              <div>Дата</div>
              <div>Кондуктор</div>
              <div>Маршрут</div>
              <div>Видані квитки</div>
              <div>Повернені квитки</div>
              <div>Прибуток</div>
              <div>Касир</div>
            </div>
              {rows}
            <div className="table-end" onLoad={()=>{AddChecklists()}}>
              <span>Showed {rows.length} rows</span>
              <a className="add-button" href="add/">Додати новий рядок</a>
            </div>
          </div>
        </>
      )
    )
  }
};