import styled, { createGlobalStyle, css, keyframes } from "styled-components";
// import { lighten } from "polished";
// import PerfectScrollbar from "react-perfect-scrollbar";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import AsyncSelect from "react-select/async";
// import { headShake } from "react-animations";


import { device } from "./mediaQuery";

export default createGlobalStyle`
  .text-center{
    text-align: center;
  }

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;

    ::-webkit-scrollbar-thumb {
      background: rgba(98,9,139,0.50);
      border-radius: 8px;
      right: 2px;
      position: absolute;
    }
  }

  *:focus {
    outline: 0;
  }

  html, body, #root {
    height: 100vh;
    overflow: hidden;
  }

  body {
    height: 100vh;
    -webkit-font-smoothing: antialiased;
    background-color: #111; /* Cor de fundo para o tema escuro */
    color: #eee; /* Cor do texto para o tema escuro */
  }

  body, input, button {
    font: 14px 'Roboto', sans-serif;
  }

  button {
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 97%;
  margin: 0 auto;
  background-color: #000;

  select {
    cursor: pointer;
    font-size: 15px;
    font-weight: bold;
    text-transform: uppercase;

    border: solid 1px #d8dbea;
    border-radius: 4px;
    height: 32px;
    padding-left: 5px;
    padding-right: 7px;

    background: #333; /* Cor de fundo para o tema escuro */
    border: solid 1px #555; /* Cor da borda para o tema escuro */
    color: #eee; /* Cor do texto para o tema escuro */

    transition: background 0.3s;
    width: 100%;

    &:focus {
      border: solid 1px #ccc;
      box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.2);
      background: #fcffd3;
    }
  }

  option {
    color: #544a57;
    font-size: 15px;
    text-transform: uppercase;
    font-weight: 500;
    line-height: 150;
    background-color: #f6f8ff;
    border: solid 1px #d8dbea;
  }
`;

export const AreaComp = styled.div`
  display: flex;
  flex: ${(props) => props.flex};
  flex-direction: ${(props) =>
    props.fDirection ? props.fDirection : "column"};
  justify-content: ${(props) => props.jContent ?? "center"};
  justify-items: left;
  align-self: ${(props) => (props.algSelf ? props.algSelf : "center")};
  align-items: ${(props) => (props.algItems ? props.algItems : "unset")};
  padding-left: ${(props) => props.pleft};
  padding-top: ${(props) => props.ptop};
  padding-right: ${(props) => props.pright};
  padding-right: ${(props) => (props.noPd ? "0" : "5px")};
  padding-bottom: ${(props) => (props.noPd ? "0" : "5px")};
  margin: ${(props) => (props.mg ? props.mg : 0)};
  width: ${(props) => props.wd}%;
  font-size: 14px;
  font-weight: 400;
  min-height: 35px;
  color: #500569;
  font-size: 12px;
  color: #232c4f;
  min-width: ${(props) => (props.minWd ? props.minWd : "auto")};
  gap: ${(props) => props.gap ?? 0};

  ${(props) =>
    props.hver &&
    css`
      &:hover {
        label,
        span {
          font-size: 12px;
          transition: font-size 0.4s;
        }
      }
    `}
  ${(props) =>
    props.bright &&
    css`
      border-right: solid 1px #ccc;
    `}
    ${(props) =>
    props.btn &&
    css`
      button {
        border: 0;
        background: none;
      }
    `}
    h1 {
    color: #fa7d00;
    font-weight: 700;
    font-size: 14px;
  }

  h3 {
    width: 100%;
    text-align: right;
    display: block;
    font-size: 14px;
    font-weight: bold;
    color: #61098a;
  }

  h2 {
    width: 100%;
    text-align: center;
    display: block;
    font-size: 16px;
    font-weight: bold;
    color: #61098a;
  }

  label {
    color: #6b6565;
    font-weight: 500;
    font-size: 13px;
  }

  @media ${device.mobileS} {
    width: ${(props) => (props.wdr ? `${props.wdr}%` : "100%")};
  }

  @media ${device.tablet} {
    width: ${(props) => (props.wdr ? `${props.wdr}%` : "100%")};
  }

  @media ${device.laptop} {
    width: ${(props) => props.wd}%;
  }

  @media ${device.laptopL} {
    width: ${(props) => props.wd}%;
  }
`;

export const Row = styled.div`
  display: flex;
  justify-content: ${(props) => props.jContent};
  justify-items: center;
  flex-wrap: ${(props) => (props.flwrap ? "wrap" : "unset")};
  margin: ${(props) => props.mg};
  margin-top: ${(props) => props.mgtop}px;
  margin-bottom: ${(props) => props.mgbottom}px;
  padding-top: ${(props) => props.pdtop}px;
  padding-bottom: ${(props) => props.pdbottom}px;
  padding-left: ${(props) => (props.pdleft ? props.pdleft : 2)}px;
  padding-right: ${(props) => (props.pdright ? props.pdright : 2)}px;
  padding: ${(props) => props.pd ?? 0};
  width: ${(props) => props.maxWd || "100%"};
  max-width: ${(props) => props.maxWd};
  gap: ${({ gp }) => gp ?? "0"};
`;


export const IconButton = styled.button`
  background: transparent;
  border: none;
  padding: 3px;
`;
