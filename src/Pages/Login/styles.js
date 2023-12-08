import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  height: 100vh;
  background-color: #111; /* Cor de fundo para o tema dark */
  color: #eee; /* Cor do texto para o tema dark */
`;

export const Content = styled.div`
  gap: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  box-shadow: 0 1px 2px #0003;
  background-color: #000; /* Cor de fundo para o tema dark */
  max-width: 550px;
  padding: 20px;
  border-radius: 5px;
`;

export const Label = styled.label`
  font-size: 18px;
  font-weight: 600;
  color: #ccc; /* Cor do texto para o tema dark */
`;

export const LabelSignup = styled.label`
  font-size: 16px;
  color: #ccc; /* Cor do texto para o tema dark */
`;

export const labelError = styled.label`
  font-size: 14px;
  color: #ff6666; /* Cor do texto para mensagens de erro no tema dark */
`;

export const Strong = styled.strong`
  cursor: pointer;

  a {
    text-decoration: none;
    color: #ccc; /* Cor do texto para o tema dark */
  }
`;
