import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  height: 100vh;
`;

export const Content = styled.div`
  gap: 15px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  box-shadow: 0 1px 2px #0003;
  background-color: #333; /* Altere para uma cor escura */
  padding: 20px;
  border-radius: 5px;
`;
export const Label = styled.label`
  font-size: 18px;
  font-weight: 600;
  color: #eee; /* Altere para uma cor clara */
`;

export const labelError = styled.label`
  font-size: 14px;
  color: #ff6666; /* Cor para mensagens de erro */
`;

export const LabelSignup = styled.label`
  font-size: 16px;
  color: #676767;
`;


export const Strong = styled.strong`
  cursor: pointer;

  a {
    text-decoration: none;
    color: #676767;
  }
`;
