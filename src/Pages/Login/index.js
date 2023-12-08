import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Form } from "@unform/web";
import { useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import {  useHistory } from "react-router-dom"
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const toastOptions = {
    autoClose: 4000,
    position: toast.POSITION.TOP_CENTER,
  };
  const history = useHistory();

  const { login, logout, currentUser } = useAuth();
  const formRefLogin = useRef(null);

  // if (currentUser) {

  //   return <Redirect to="/" />;
  // }

  const handleLogin = async (formData) => {
    const { email, senha } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.info("Por favor, insira um e-mail válido.", toastOptions);

      return;
    }

    try {
      await login(email, senha);
      history.push("/");
    } catch (err) {
      toast.error(
        "Ocorreu um erro ao fazer login. Verifique suas credenciais" + err,
        toastOptions
      );
      console.log(err);
    }
  };

  return (
    <>
      <Form ref={formRefLogin} onSubmit={handleLogin}>
        <C.Container>
          <C.Label>Hub SearchTag</C.Label>

          <C.Content>
            <Input type="email" label="Digite seu e-mail:" name="email" />
            <Input type="password" label="Digite sua senha:" name="senha" />

            <Button
              Text={"Entrar"}
              onClick={() => formRefLogin.current.submitForm()}
            />
          </C.Content>
        </C.Container>
      </Form>
    </>
  );
}

