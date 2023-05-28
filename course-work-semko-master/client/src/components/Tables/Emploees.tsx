import React from "react";
import "./StyledTable.css";
import Message from "../Message";
import { AddEmploees } from "../../db/Driver";
import RowDeleteButton from "./RowDeleteButton";
import ApiContext from "src/db/ApiContext";

export type Employee = {
  id: number;
  name: string;
  position: string;
};

interface StateProps {
  rows: JSX.Element[];
  isLoaded: boolean;
};

export default class EmploeesTable extends React.Component {
  state: StateProps = { 
    rows: [],
    isLoaded: false 
  };

  EmploeesTableRow: React.FC<Employee> = ({ id, name, position }) => {
    const { apiBaseUrl } = React.useContext(ApiContext);
    return (
      <>
        <div>{id}</div>
        <div>{name}</div>
        <div>{position}</div>
        <RowDeleteButton request={`${apiBaseUrl}/employees/d/${id}`} />
      </>
    );
  };
  
  AllItems = async () => {
    const items = await AddEmploees();
    return items.map((props, idx) => {
      return (<div className="table-row" style={{gridTemplateColumns: "10% 60% calc(30% - 70px) 70px"}} key={idx}>
        <this.EmploeesTableRow id={props.id} name={props.name} position={props.position} />
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
          <p className="title">Працівники</p>
          <div className="table">
            <div className="table-title" style={{gridTemplateColumns: "10% 60% calc(30% - 70px) 70px"}}>
              <div>ID</div>
              <div>ПІБ</div>
              <div>Посада</div>
            </div>
              {rows}
            <div className="table-end" onLoad={()=>{AddEmploees()}}>
              <span>Showed {rows.length} rows</span>
              <a className="add-button" href="add/">Додати новий рядок</a>
            </div>
          </div>
        </>
      )
    )
  }
};