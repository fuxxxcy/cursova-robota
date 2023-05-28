import React from "react";
import styled from "styled-components";
import arrow from "../assets/img/arrow.svg";

const ArrowLayout = styled.div`
    height: 100%;
    margin-right: 10px;
    display: flex;
    align-items: center;
`;

const ArrowImg = styled.img`
    width: 12px;
    height: 12px;
    object-fit: contain;
`;

const Arrow = () => {
    return (
        <ArrowLayout>
            <ArrowImg src={arrow} alt="" />
        </ArrowLayout>
    );
};

export default Arrow;
