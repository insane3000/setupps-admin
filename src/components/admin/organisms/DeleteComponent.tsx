import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
const DeleteSt = styled.div`
  width: 100%;
  height: 100%;
  background: #0c0c0c;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .title-delete-window {
    font-family: "Roboto 900";
    font-size: 2.5rem;
    color: white;
    margin-bottom: 2rem;
  }
  .btns-delete-window {
    width: 30rem;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    /* background: red; */
    .btn {
      width: 10rem;
      height: 3rem;
      font-family: "Roboto 900";
      font-size: 2rem;
      color: white;
      background: rgb(89, 1, 231);
      border-style: none;
      outline: none;
      border-radius: 0.3rem;
      cursor: pointer;
      &:hover {
        color: #000000;
        background: rgb(255, 255, 255);
      }
    }
  }
`;
const DeleteWindow = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const paramsLocation = new URLSearchParams(location.search);

  // !Obteniendo los parametros
  const component = paramsLocation.get("component");
  const id = paramsLocation.get("id");

  // !Delete Component
  const handleDelete = async () => {
    await axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/${component}/${id}?component=${component}`)
      .then(() => {
        navigate(-1);
        toast.success("Borrado.");
      });
  };
  return (
    <DeleteSt>
      <h2 className="title-delete-window">¿Estás seguro de que quieres borrar...?</h2>
      <div className="btns-delete-window">
        <button type="button" className="btn" onClick={handleDelete}>
          Si
        </button>
        <button type="button" className="btn" onClick={() => navigate(-1)}>
          No
        </button>
      </div>
    </DeleteSt>
  );
};

export default DeleteWindow;
