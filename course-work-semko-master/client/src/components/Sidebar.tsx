import React, { useEffect, useState } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import styled from "styled-components";
import Arrow from "./Arrow";

const SidebarLayout = styled.div`
  position: relative;
  width: var(--sidebar-width);
  height: 100%;
  display: inline-flex;
  flex-direction: column;
  align-items: center;

  z-index: 1;
  background-color: var(--workspace-primarly-color);
`;

const SidebarTitleLayout = styled.a`
  width: fit-content;
  height: fit-content;
  margin: 20px auto;

  text-decoration: none;
  font-size: 20px;
  font-weight: bold;
  font-style: italic;
  
  background: var(--workspace-gradient);
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: 100% 3px;
  transition: background-size 0.5s ease-in-out;
`;

const SidebarBrowserRouter = styled.div`
  position: sticky;
  width: 80%;
  top: 0px;
  bottom: 0px;
`;

const StyledLink = styled.a`
  box-sizing: border-box;
  height: 50px;
  width: 100%;
  margin-top: 10px;
  padding: 9px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  overflow: hidden;
  border-radius: 12px;
  background: var(--workspace-tertiary-color);

  > div {
    height: 100%;
    display: flex;
    align-items: center;

    > span {
      height: fit-content;
      font-size: 14px;
    }
  }

  :hover, :active {
    background: var(--workspace-gradient);
  }
`;


const Sidebar = () => {
  interface SidebarLinkProps {
      link: string;
      text?: string;
  };

  const SidebarTitle = ({link, text}: SidebarLinkProps) => {
    return (<SidebarTitleLayout href={link}>{text}</SidebarTitleLayout>)
  };

  const SidebarLink = ({link, text}: SidebarLinkProps) => {
    const [ifActive, setIfActive] = useState("");
    let location = useLocation();

    useEffect(() => {
        setIfActive(location.pathname === link?  "sidebar-link-active" : "")
    }, [link, location]);
    
    return (
        <StyledLink className={"nav-link "+ ifActive} href={link}>
            <div>
              <span>{text ?? link}</span>
            </div>
            <Arrow />
        </StyledLink>
    )
  };

  return (
    <SidebarLayout>
      <SidebarTitle link="/" text={"Курсова робота"} />
      <SidebarBrowserRouter>
        <BrowserRouter>
          <SidebarLink link="/employees/" text={"Працівники"} />
          <SidebarLink link="/itineraries/" text={"Маршрути"} />
          <SidebarLink link="/collectors/" text={"Інкасатори"} />
          <SidebarLink link="/checklists/" text={"Контрольні листи"} />
          <SidebarLink link="/dco/" text={"Касові ордери"} />
        </BrowserRouter>
      </SidebarBrowserRouter>
    </SidebarLayout>
  );
};

export default Sidebar;
