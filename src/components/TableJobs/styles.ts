import styled from "styled-components";

export const Table = styled.table`
  margin: 40px 0;
  width: 100%;
  border-collapse: collapse;

  .desc {
    min-width: 300px;
  }

  th {
    text-align: left;
    color: #fff;
    font-weight: 400;
    font-size: 13px;
    text-transform: uppercase;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding: 0 10px;
    padding-bottom: 14px;
  }

  tr:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  td {
    height: 40px;
    line-height: 40px;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.4);
    padding: 0 10px;
  }
`;
