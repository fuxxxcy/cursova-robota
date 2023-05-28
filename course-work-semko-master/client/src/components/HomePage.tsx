import React from "react";
import styled from "styled-components";
import task from "../assets/img/task.png";

const HomePageLayout = styled.div`
    margin: 10vh 10vw;
    width: 60vw;

    > div {
        width: fit-content;
        margin: 3% auto;

        font-size: 20px;
    }

    > img {
        width: 100%;
    }
`;

const HomePage = () => {
    return (
        <HomePageLayout>
            <div style={{fontSize: "32px"}}>Робота Семка Андрія ІС-12</div>
            <div style={{width: "100%"}}>База даних: MsSQL<br />Фронтенд: TypeScript React<br />Бекенд: Express.js</div>
            <img src={task} alt="" />
        </HomePageLayout>
    );
};

export default HomePage;