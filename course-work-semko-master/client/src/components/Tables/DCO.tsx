import React from "react";
import "./StyledTable.css";
import Message from "../Message";
import { AddCashOrders } from "../../db/Driver";
import RowDeleteButton from "./RowDeleteButton";
import ApiContext from "src/db/ApiContext";

export type CashOrder = {
  id: number, 
  date: string, 
  sum: number,
  basis: string,
  sender: string,
  receiver: string,
  destinationCode: string,
  analyticalAccountingCode: string,
  corespondingAccount: string,
  EDRPOU: string
};

interface StateProps {
  rows: JSX.Element[];
  isLoaded: boolean;
};

export default class CashOrdersTable extends React.Component {
  state: StateProps = { 
    rows: [],
    isLoaded: false 
  };

  DCOTableRow: React.FC<CashOrder> = ({ id, date, sum, basis, sender, receiver, destinationCode, analyticalAccountingCode, corespondingAccount, EDRPOU }) => {
    const { apiBaseUrl } = React.useContext(ApiContext);
    return (
      <>
        <div>{id}</div>
        <div>{date}</div>
        <div>{sum}</div>
        <div>{basis}</div>
        <div>{sender}</div>
        <div>{receiver}</div>
        <div>{destinationCode ?? "-"}</div>
        <div>{analyticalAccountingCode ?? "-"}</div>
        <div>{corespondingAccount}</div>
        <div>{EDRPOU}</div>
        <RowDeleteButton request={`${apiBaseUrl}/dco/d/${id}`} />
      </>
    );
  };
  
  AllItems = async () => {
    const items = await AddCashOrders();
    return items.map((props, idx) => {
      return (<div className="table-row" style={{gridTemplateColumns: "5% 10% 5% 20% 10% 10% 10% 10% 10% calc(10% - 70px) 70px"}} key={idx}>
        <this.DCOTableRow 
        id={props.id} 
        date={props.date} 
        sum={props.sum} 
        basis={props.basis} 
        sender={props.sender} 
        receiver={props.receiver} 
        destinationCode={props.destinationCode} 
        analyticalAccountingCode={props.analyticalAccountingCode} 
        corespondingAccount={props.corespondingAccount} 
        EDRPOU={props.EDRPOU} 
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
          <p className="title">Видаткові касові ордери</p>
          <div className="table">
            <div className="table-title" style={{gridTemplateColumns: "5% 10% 5% 20% 10% 10% 10% 10% 10% calc(10% - 70px) 70px"}}>
              <div>ID</div>
              <div>Дата</div>
              <div>Сума</div>
              <div>Підстава</div>
              <div>Відправник</div>
              <div>Отримувач</div>
              <div>Код цільового призначення</div>
              <div>Код аналітичного рахунку</div>
              <div>Кореспондуючий рахунок, субрахунок</div>
              <div>Код ЄДРПОУ</div>
            </div>
              {rows}
            <div className="table-end" onLoad={()=>{AddCashOrders()}}>
              <span>Showed {rows.length} rows</span>
              <a className="add-button" href="add/">Додати новий рядок</a>
            </div>
          </div>
        </>
      )
    )
  }
};