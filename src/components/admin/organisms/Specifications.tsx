import { useEffect, useState } from "react";
import styled from "styled-components";
import ArrowLeftIcon from "icons/ArrowLeftIcon";
import { useNavigate } from "react-router-dom";
const SpecificationsSt = styled.div`
  @media only screen and (min-width: 568px) {
    width: 100%;
    height: 100%;
    background: #000000;
    position: absolute;
    overflow-y: scroll;
    .header-specifications {
      width: 100%;
      height: 4vw;
      position: sticky;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1;
      background: black;
      display: flex;
      justify-content: start;
      align-items: center;
      .sysIconArrowLeft {
        width: 4vw;
        height: 4vw;
        margin-left: 0.5vw;
        padding: 0.5vw;
        cursor: pointer;
        color: white;
      }
      .specLength {
        font-family: "Roboto 900";
        font-size: 2vw;
        color: white;
      }
      .btn-save-specifications {
        position: absolute;
        right: 2vw;
        font-family: "Roboto 700";
        font-size: 1.5vw;
        color: white;
        background: #6200ff;
        outline: none;
        border-style: none;
        padding: 0.5vw 2vw;
        border-radius: 0.3vw;
        cursor: pointer;
        &:hover {
          background: white;
          color: black;
        }
      }
    }
    .specifications-container {
      width: 100%;
      height: auto;
      display: grid;
      grid-template-columns: 100%;
      grid-auto-rows: 10vw;

      .itemSpecification {
        display: grid;
        grid-template-columns: 30% 70%;
        border-top: 1px solid #161515;
        overflow: hidden;
        position: relative;
        .label-delete-button {
          width: 100%;
          height: 10vw;
          border-style: none;
          outline: none;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          background: #000000;

          input {
            width: calc(100% - 6vw);
            height: auto;
            border-style: none;
            outline: none;
            font-family: "Roboto 700";
            font-size: 1vw;
            color: white;
            padding: 0.5vw 1vw;
            background: #000000;
            border-radius: 0.3vw;
          }
          button {
            width: 6vw;
            height: 1.5vw;
            cursor: pointer;
            border-radius: 0.5vw;
            outline: none;
            border-style: none;
            font-family: "Roboto 700";
            background: #6200ff;
            color: #ffffff;
            margin-top: 0.5vw;
            &:hover {
              background: white;
              color: black;
            }
          }
        }
        .text-content {
          background: #000000;
          width: 100%;
          height: 10vw;
          resize: none;
          border-style: none;
          outline: none;
          font-family: "Roboto 300";
          font-size: 1vw;
          color: white;
          padding: 0.5vw 0.5vw;
          border-radius: 0.3vw;
        }
      }
      .addNewItem {
        width: 4vw;
        height: 4vw;
        position: fixed;
        right: 2vw;
        bottom: 2vw;
        border-radius: 100%;
        border-style: none;
        outline: none;
        font-family: "Roboto 100";
        font-size: 3vw;
        cursor: pointer;
        background: #6200ff;
        color: white;
        &:hover {
          background: #ffffff;
          color: #000000;
        }
      }
    }
  }
`;
interface props {
  setSpecificationsModal: any;
  setSpecifications: any;
  specifications: any;
}

const Specifications = (props: props) => {
  const navigate = useNavigate();
  const [specifications, setSpecifications] = useState<any>([]);
  //   console.log(specifications);

  // !Delete Item
  const deleteItem = (key: any) => {
    setSpecifications(specifications.filter((i: any) => i.key !== key));
  };
  // !Handle OnChange Item
  const handleOnChange = (event: any, key: any) => {
    const newArr = specifications.map((obj: any) => {
      if (obj.key === key) {
        return { ...obj, [event.currentTarget.name]: event.currentTarget.value.trim() };
      }
      return obj;
    });
    setSpecifications(newArr);
  };
  // !Set Window Location
  const setModal = () => {
    props.setSpecificationsModal(false);
  };
  // !UseEffect
  useEffect(() => {
    setSpecifications(props.specifications);
    window.addEventListener("popstate", setModal);
    return () => {
      window.removeEventListener("popstate", setModal);
    };
  }, []);
  return (
    <SpecificationsSt>
      <div className="header-specifications">
        <ArrowLeftIcon className="sysIconArrowLeft" onClick={() => navigate(-1)} />
        <p className="specLength">{specifications.length}</p>
        <button
          type="button"
          className="btn-save-specifications"
          onClick={() => {
            props.setSpecifications(specifications);
            navigate(-1);
          }}
        >
          Save
        </button>
      </div>
      <div className="specifications-container">
        {specifications.map((i: any) => (
          <div className="itemSpecification" key={i.key}>
            <div className="label-delete-button">
              <input
                type="text"
                name="title"
                value={i.title}
                onChange={(event) => handleOnChange(event, i.key)}
                placeholder="___________"
              />
              <button type="button" onClick={() => deleteItem(i.key)}>
                Delete
              </button>
            </div>
            <textarea
              className="text-content"
              name="content"
              defaultValue={i.content}
              onChange={(event) => handleOnChange(event, i.key)}
              placeholder="___________"
            ></textarea>
          </div>
        ))}
        <button
          className="addNewItem"
          type="button"
          onClick={() =>
            setSpecifications([...specifications, { key: Date.now(), title: "", content: "" }])
          }
        >
          +
        </button>
      </div>
    </SpecificationsSt>
  );
};

export default Specifications;
