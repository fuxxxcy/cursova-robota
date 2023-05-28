import React from "react";
import styled from "styled-components";

const TableLayout = styled.div`
  box-sizing: border-box;
  min-width: 800px;
  width: calc(100% - 200px);
  height: calc(100% - 140px);
  margin: 70px 100px;
  padding: 30px;

  border-radius: 40px;
  background-color: var(--workspace-primarly-color);
`;

type ContextTableProps<T extends React.Component> = {
  component: new (props: any) => T
}

export default class ContextTable<T extends React.Component> extends React.Component<ContextTableProps<T>> {
  render() {
    const { component: Component, ...props } = this.props;
    return (
      <TableLayout>
        <Component {...props} />
      </TableLayout>
    )
  }
}