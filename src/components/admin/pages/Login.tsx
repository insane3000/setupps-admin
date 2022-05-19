import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import axios from "axios";
// *Redux
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "redux/actions/appAction";
import axios from "axios";
import { useNavigate } from "react-router";
import { StoreInterface } from "interfaces/storeTemplate";
// *Axios
// import Spinner from "./Spinner";
// import { StoreInterface } from "interfaces/storeTemplate";
//* INTERFACE APP
// import { StoreInterface } from "interfaces/storeTemplate";

const AddProductsSt = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-family: "Roboto 300";
  font-size: 2rem;
  position: relative;
  border-right: 0.0625rem solid #333333;
  position: relative;

  .close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 2rem;
    height: 2rem;
    text-decoration: none;
    color: white;
    font-size: 2rem;
  }
  .titleAddProducts {
    width: 80%;
    height: 3rem;
    margin-bottom: 0.5rem;
    color: white;
    font-family: "Roboto 700";
    font-size: 1.5rem;
    text-align: center;
    line-height: 3rem;
    text-transform: uppercase;
    /* background: red; */
  }
  .inputValue {
    background: #050505;
    width: 80%;
    height: 3rem;
    margin-bottom: 1rem;
    outline: none;
    border-style: none;
    padding: 0 1rem;
    color: white;
    font-family: "Roboto 300";
    font-size: 1rem;
    border: 0.0625rem solid #5100ff;
    border-radius: 0.3rem;
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    border: 1px solid #5100ff;
    -webkit-text-fill-color: #ffffff71;
    -webkit-box-shadow: 0 0 0px 1000px #000 inset;
    box-shadow: 0 0 0px 1000px #000 inset;
    transition: background-color 5000s ease-in-out 0s;
  }
  .alert {
    width: 80%;
    color: red;
    font-family: "Roboto 300";
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  .btnSubmit {
    background: #4400ff;
    width: 80%;
    height: 3rem;
    margin-bottom: 0.5rem;
    outline: none;
    border-style: none;
    padding: 0 1rem;
    color: #ffffff;
    font-family: "Roboto 300";
    font-size: 1rem;
    cursor: pointer;
    border-radius: 0.3rem;
  }
  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    /* width: 20rem;
    height: 25rem; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    font-family: "Roboto 300";
    font-size: 2rem;
    position: relative;
    border-right: 0.0625rem solid #333333;

    .close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      width: 2rem;
      height: 2rem;
      text-decoration: none;
      color: white;
      font-size: 2rem;
    }
    .titleAddProducts {
      width: 80%;
      height: 3rem;
      margin-bottom: 0.5rem;
      color: white;
      font-family: "Roboto 700";
      font-size: 1.5rem;
      text-align: center;
      line-height: 3rem;
      text-transform: uppercase;
      /* background: red; */
    }
    .inputValue {
      background: #050505;
      width: 20rem;
      height: 3rem;
      margin-bottom: 1rem;
      outline: none;
      border-style: none;
      padding: 0 1rem;
      color: white;
      font-family: "Roboto 300";
      font-size: 1rem;
      border: 0.0625rem solid #5100ff;
      border-radius: 0.3rem;
    }
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    textarea:-webkit-autofill,
    textarea:-webkit-autofill:hover,
    textarea:-webkit-autofill:focus,
    select:-webkit-autofill,
    select:-webkit-autofill:hover,
    select:-webkit-autofill:focus {
      border: 1px solid #5100ff;
      -webkit-text-fill-color: #ffffff71;
      -webkit-box-shadow: 0 0 0px 1000px #000 inset;
      box-shadow: 0 0 0px 1000px #000 inset;
      transition: background-color 5000s ease-in-out 0s;
    }
    .alert {
      width: 20rem;
      color: red;
      font-family: "Roboto 300";
      font-size: 1rem;
      margin-bottom: 1rem;
    }
    .btnSubmit {
      background: #4400ff;
      width: 20rem;
      height: 3rem;
      margin-bottom: 0.5rem;
      outline: none;
      border-style: none;
      padding: 0 1rem;
      color: #ffffff;
      font-family: "Roboto 300";
      font-size: 1rem;
      cursor: pointer;
      border-radius: 0.3rem;
    }
  }
`;

const AddProducts = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const app = useSelector((store: StoreInterface) => store.app);

  const [state, setState] = useState({
    user: "",
    password: "",
  });
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/admin`, state)
      .then(function (response) {
        dispatch(setLogin(response.data.token, response.data.id));
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("id", response.data.id);
        navigate(`/admin/components/cpu?page=1&search=&available=&manufacturer=`);
      })
      .catch(function (error) {
        setError(true);
        localStorage.setItem("token", "");
        localStorage.setItem("id", "");
      });
  };

  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("token") !== "") {
      navigate(`/admin/components/cpu?page=1&search=&available=&manufacturer=`);
      //       dispatch(setLogin(`${localStorage.getItem("token")}`, `${localStorage.getItem("id")}`));
    }
  }, []);

  return (
    <AddProductsSt onSubmit={handleSubmit}>
      <h2 className="titleAddProducts">Identificate</h2>
      <input
        className="inputValue"
        type="text"
        name="user"
        placeholder="Nombre de usuario."
        onChange={(e) => setState({ ...state, user: e.target.value })}
        value={state.user}
        onFocus={(e) => e.target.select()}
        required
      />
      <input
        className="inputValue"
        type="password"
        name="password"
        placeholder="Contraseña."
        onChange={(e) => setState({ ...state, password: e.target.value })}
        value={state.password}
        onFocus={(e) => e.target.select()}
        required
      />
      {error && <span className="alert">Los datos son incorrectos.</span>}
      <button className="btnSubmit" type="submit">
        Entrar
      </button>

      {/* {spinner && <Spinner />} */}
    </AddProductsSt>
  );
};

export default AddProducts;
