import styled from "styled-components";

export const Container = styled.div`
  h2 {
    font-size: 19px;
    font-weight: 200;
    letter-spacing: 1px;
    margin: 0;
    color: rgba(255, 255, 255, 0.8);
  }
`;

export const Card = styled.div`
  display: block;
  padding: 20px;
  width: 80%;
  height: auto;

  background-color: #202b33;
  margin: 40px auto;
  border-radius: 4px;

  @media (min-width: 497px) and (max-width: 1173px) {
    width: 60%;
  }

  @media screen and (min-width: 1174px) {
    display: flex;
    width: 80%;
  }
`;

export const ProgressContent = styled.div`
  padding: 5px;
  display: block;

  @media screen and (min-width: 1174px) {
    border-right: 1px solid #111;
  }

  @media screen and (min-width: 819px) {
    padding: 10px 20px 10px 5px;
  }
`;

export const ProgressCard = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  width: 100%;

  margin: 30px 0;

  span {
    color: #fff;
    font-size: 24px;
    font-weight: 300;
    margin-left: 20px;
    margin-bottom: 6px;
  }

  h3 {
    font-size: 13px;
    margin-left: 20px;
    font-weight: 300;
    color: rgba(255, 255, 255, 0.4);

    width: 150px;
  }

  @media screen and (min-width: 1174px) {
    justify-content: space-between;
  }
`;

export const TableContent = styled.div`
  padding: 5px;
  width: 100%;

  h2 {
    margin-bottom: 50px;
  }

  @media screen and (min-width: 819px) {
    padding: 10px 30px;
  }
`;

export const TablesContainer = styled.div`
  overflow-y: scroll;

  @media screen and (min-width: 800px) {
    ::-webkit-scrollbar-track {
      background-color: transparent;
    }
    ::-webkit-scrollbar {
      width: 6px;
      background: transparent;
      border-radius: 50px;
    }
    ::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.15);
    }
  }

  @media screen and (min-width: 1174px) {
    max-height: 400px;
  }
`;
