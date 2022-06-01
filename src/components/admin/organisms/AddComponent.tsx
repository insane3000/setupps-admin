import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { StoreInterface } from "interfaces/storeTemplate";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
// import Spinner from "components/Spinner";
// *Components
import { components } from "json/components";
import Specifications from "./Specifications";
const AddComponentSt = styled.form`
  width: 100%;
  height: 100%;

  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    position: relative;
    display: grid;
    grid-template-columns: 100%;
    gap: 1rem;
    justify-content: center;
    align-content: flex-start;
    .title-add {
      line-height: 4rem;
      text-align: center;
      font-family: "Roboto 900";
      color: white;
      font-family: 1rem;
      text-transform: uppercase;
      margin-top: 1rem;
    }
    .grid-inputs {
      display: grid;
      grid-template-columns: repeat(4, calc(25% - 2rem));
      grid-auto-rows: 4rem;
      justify-content: center;
      align-content: flex-start;
      column-gap: 0.5rem;
      row-gap: 2rem;
      overflow-y: scroll;
      .input-label-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        overflow: hidden;
        .label {
          width: 100%;
          height: 1rem;
          line-height: 1rem;
          border-radius: 0.3rem 0.3rem 0 0;
          font-family: "Roboto 300";
          font-size: 0.8rem;
          color: #a5a5a5;
          padding: 0 0.5rem;
          text-transform: capitalize;
          text-align: start;
        }
        .input {
          width: 100%;
          height: 3rem;
          line-height: 3rem;
          border-style: none;
          outline: none;
          padding: 0 1rem;
          color: white;
          font-family: "Roboto 300";
          font-size: 1rem;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #141414;
          border-radius: 0.3rem;
        }
      }
    }

    .btns-container {
      display: flex;
      justify-content: center;
      align-items: center;
      .save-btn {
        border-style: none;
        outline: none;
        padding: 0.5rem 2rem;
        border-radius: 0.3rem;
        font-family: "Roboto 900";
        font-size: 2rem;
        cursor: pointer;
        transition: 0.1s;
        background: #5901e7;
        color: white;
        text-decoration: none;
        margin-left: 1rem;
        margin-right: 1rem;
        &:hover {
          transition: 0.1s;
          background: #ffffff;
          color: #000000;
        }
      }
    }
  }
`;

const AddComponent = () => {
  const location = useLocation();
  const fileRef = useRef(null);
  const params = useParams();
  const navigate = useNavigate();
  const app = useSelector((store: StoreInterface) => store.app);

  const [state, setState] = useState<any>();
  const [files, setFiles] = useState<any>();
  //!specifications
  const [specificationsModal, setSpecificationsModal] = useState(false);
  const [specifications, setSpecifications] = useState([]);
  //   console.log(JSON.stringify(specifications));
  // !Handle Changes
  const handleChangeState = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setState({ ...state, [e.currentTarget.name]: e.currentTarget.value });
  };
  const handleChangeFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.files;
    setFiles(value);
  };

  // !Handle Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formData = new FormData();
    for (let index = 0; index < components[`${params.component}`].length; index++) {
      const element = components[`${params.component}`][index].key;
      formData.append(element, state[element]);
    }
    formData.append(`specifications`, JSON.stringify(specifications));
    for (let index = 0; index < files?.length; index++) {
      formData.append(`files`, files[index]);
    }

    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/${params.component}`, formData, {
        headers: {
          authorization: `Bearer ${app.login.token}`,
          id: `${app.login.id}`,
        },
      })
      .then((response) => {
        if (response.statusText === "OK") {
        //   navigate(-1);
          toast.success("Guardado.");
        }
      });
  };

  useEffect(() => {
    let localState = {};
    setState(
      components[`${params.component}`].map((i: any) => {
        localState = { ...localState, [i.key]: i.defaultValue };
        return i;
      })
    );
    setState(localState);
  }, []);
  //   console.log(components[`${params.component}`]);

  return (
    <AddComponentSt onSubmit={handleSubmit}>
      <h1 className="title-add">Add {params.component}</h1>
      <div className="grid-inputs">
        {state &&
          components[`${params.component}`].map((i: any) => (
            <div className="input-label-container" key={i.key}>
              <span className="label">{i.key}</span>
              {i.inputType === "select" ? (
                <select
                  name={i.key}
                  className="input"
                  value={state[i.key]}
                  onChange={(e) => handleChangeState(e)}
                >
                  {i.options.map((o: any) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  name={i.key}
                  className="input"
                  type={i.inputType}
                  onChange={(e) => handleChangeState(e)}
                  onFocus={(e) => e.currentTarget.select()}
                  value={state[i.key]}
                  //   required
                  readOnly={i.readOnly}
                />
              )}
              {/* <input
                name={i.key}
                className="input"
                type={i.inputType}
                onChange={(e) => handleChangeState(e)}
                onFocus={(e) => e.currentTarget.select()}
                value={state[i.key]}
                // required
                readOnly={i.readOnly}
              /> */}
            </div>
          ))}

        <div className="input-label-container">
          <span className="label">Images:</span>
          <input
            ref={fileRef}
            name="file"
            className="input"
            type="file"
            onChange={(e) => handleChangeFiles(e)}
            accept="image/*"
            multiple
          />
        </div>
        <div className="input-label-container">
          <span className="label">Specifications:</span>
          <button
            className="input"
            type="button"
            onClick={() => {
              navigate(`${location.pathname}${location.search}`);
              setSpecificationsModal(true);
            }}
            style={{ cursor: "pointer" }}
          >
            Specifications: {specifications.length}
          </button>{" "}
        </div>
      </div>
      <div className="btns-container">
        <button type="submit" className="save-btn">
          Guardar
        </button>
        <button type="button" className="save-btn" onClick={() => navigate(-1)}>
          Cancelar
        </button>
      </div>
      {specificationsModal && (
        <Specifications
          setSpecificationsModal={setSpecificationsModal}
          setSpecifications={setSpecifications}
          specifications={specifications}
        />
      )}
    </AddComponentSt>
  );
};

export default AddComponent;
