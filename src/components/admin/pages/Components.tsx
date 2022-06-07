import axios from "axios";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useLocation, useNavigate, useParams, Outlet } from "react-router-dom";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { components as jsonComponents } from "json/components";
// *Icons
import EditIcon from "icons/EditIcon";
import DeleteIcon from "icons/DeleteIcon";
import ArrowRightIcon from "icons/ArrowRightIcon";
// *React Icons
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdFirstPage } from "react-icons/md";
import { MdLastPage } from "react-icons/md";
import Spinner from "components/Spinner";
import { StoreInterface } from "interfaces/storeTemplate";
import { useSelector } from "react-redux";
const MediaSt = styled.div`
  width: 100%;
  height: 100%;

  // !Estilos para Desktop
  @media only screen and (min-width: 568px) {
    width: 100%;
    height: 100%;
    position: relative;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 7rem calc(100% - 7rem);
  }
`;
const DashboardSt = styled.form`
  width: 100%;
  height: 7rem;
  font-family: "Roboto 100";
  font-size: 2rem;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 0.0625rem solid #333333;
  display: grid;
  grid-template-columns: 7.5% 10% 10% 15% 19rem calc(47.5% - 27rem) 10%;
  grid-template-rows: 100%;
  gap: 1rem;
  position: relative;
  justify-content: center;
  align-content: center;
  .cell-label-input {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .label {
      width: 100%;
      height: 1.5rem;
      line-height: 1.5rem;
      font-family: "Roboto 300";
      font-size: 1rem;
      color: #929292;
      text-align: center;
    }
    .select-arrow {
      width: 100%;
      height: 3.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      border-radius: 0.3rem;
      background: #000000;

      .sysIconArrowSelect {
        position: absolute;
        right: 1rem;
        color: #ffffff;
        transform: rotate(90deg);
      }

      .input {
        width: 100%;
        height: 100%;
        background: none;
        border-style: none;
        outline: none;
        padding: 0 1rem;
        font-family: "Roboto 900";
        font-size: 1.5rem;
        color: white;
        position: relative;
        // !Hiden arrow
        -webkit-appearance: none;
        appearance: none;
        option {
          background: #121312;
          font-family: "Roboto 300";
          font-size: 1.5rem;
          color: white;
          /* padding: 1rem 1rem; */
        }
      }
    }
    .inputOnly {
      border-style: none;
      outline: none;
      text-align: center;
      font-family: "Roboto 900";
      font-size: 2rem;
      color: white;
      /* background: none; */
    }
    .search {
      border-style: none;
      outline: none;
      text-align: start;
      font-family: "Roboto 900";
      font-size: 2rem;
      color: white;
      padding: 0 1rem;
      /* background: none; */
    }
    .pagination {
      /* background: red; */
      background: none;
      display: grid;
      grid-template-columns: repeat(5, 3.5rem);
      grid-template-rows: 3.5rem;
      justify-content: space-evenly;
      align-content: center;
      .btn {
        width: 3.5rem;
        height: 3.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0.3rem;
        background: #5901e7;
        outline: none;
        border-style: none;
        overflow: hidden;
        color: white;
        font-family: "Roboto 900";
        font-size: 1.5rem;
        cursor: pointer;
        &:hover {
          background: #ffffff;
          color: black;
          transition: 0.1s;
        }
        .sysIconArrow {
          width: 100%;
          height: 100%;
          padding: 0.8rem;
        }
      }
    }
    .addMedia {
      background: #5901e7;
      border-radius: 0.3rem;
      font-family: "Roboto 900";
      font-size: 2rem;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      text-decoration: none;
      &:hover {
        background: #ffffff;
        color: #000000;
      }
    }
  }
`;

const TableSt = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-auto-rows: 2rem;
  row-gap: 0.2rem;
  overflow-y: scroll;
  position: relative;
  border-bottom: 0.0625rem solid #333333;
  overflow: visible;
  .tRow {
    display: grid;
    grid-template-columns: 5% 7.5% calc(25% - 2.6rem) 7.5% 5% 5% 5% 7.5% 7.5% 7.5% 7.5% 5% 5%;
    grid-template-rows: 100%;
    column-gap: 0.2rem;
    justify-content: center;
    align-content: center;

    &:hover {
      .cell {
        background: #1c1c1d;
      }
      .image-container {
        .afuera {
          display: flex;
        }
      }
      .head {
        background: #000000;
      }
      .sort {
        /* background: #ffffff;
        color: black; */
        cursor: pointer;
      }
      .action-btn {
        background: #5901e7;
      }
    }
    .cell {
      background: #141414;
      line-height: 2rem;
      display: block;
      border-radius: 0.3rem;
      font-family: "Roboto 500";
      font-size: 0.8vw;
      color: white;
      padding: 0 1rem;

      //! Dots ...
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .image-container {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;
      position: relative;
      overflow: visible;
      .image {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      .afuera {
        /* border: 0.0625rem solid white; */
        border-radius: 0.2rem;
        width: 6.25rem;
        height: auto;
        display: none;
        position: absolute;
        /* top: 4rem; */
        right: 0;
        bottom: 0;
        /* background: red; */
        z-index: 1;
      }
    }
    .head {
      background: #000000;
      font-family: "Roboto 300";
      font-size: 0.8vw;
      text-align: center;
      color: #ffffff;
      text-transform: none;
      text-transform: capitalize;
    }
    .sort {
      font-family: "Roboto 900";
    }

    .action-btn {
      background: #5901e7;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.1rem;
      &:hover {
        background: #ffffff;
        color: #000000;
      }
    }
    .center {
      text-align: center;
      text-transform: capitalize;
    }
    .none {
      display: block;
    }
  }
  //! Para mantener pegado los titulos
  .sticky-top {
    position: sticky;
    top: 0;
    background: #0d0d0e;
  }
`;

const Components = () => {
  const params: any = useParams();
  const location = useLocation();
  const paramsLocation = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const app = useSelector((store: StoreInterface) => store.app);

  // !Obteniendo los parametros
  const page: any = paramsLocation.get("page");
  const search: any = paramsLocation.get("search");
  const available: any = paramsLocation.get("available");
  const manufacturer: any = paramsLocation.get("manufacturer");
  // !Fetching Function
  const fetchData = async ({ queryKey }: any) => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/${queryKey[0]}?page=${queryKey[1]}&search=${queryKey[2]}&available=${queryKey[3]}&manufacturer=${queryKey[4]}`,
      {
        headers: {
          authorization: `Bearer ${app.login.token}`,
          id: `${app.login.id}`,
        },
      }
    );
    return data;
  };
  // !UseQuery
  const { data, isLoading, isError } = useQuery(
    [`${params.component}`, page, search, available, manufacturer],
    fetchData,
    {
      keepPreviousData: true,
      cacheTime: 0,
      staleTime: 0,
      onError: () => {
        navigate("/");
      },
    }
  );
  //     console.log(data);

  // ! HANDLE SEARCH
  const timerRef = useRef<any>(null);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    clearTimeout(timerRef.current);
    if (value.length >= 0) {
      timerRef.current = setTimeout(() => {
        navigate(
          `/admin/components/${params.component}?page=1&search=${value}&available=${available}&manufacturer=${manufacturer}`
        );
      }, 500);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>Error</h1>;
  }
  const headers: any = {
    cpu: [
      "manufacturer",
      "model",
      "price",
      "power",
      "specifications",
      "available",

      "architecture",
      "total_cores",
      "integrated_graphics",
      "launch_date",
    ],
    mobo: [
      "manufacturer",
      "model",
      "price",
      "power",
      "specifications",
      "available",

      "PCIe",
      "chipset",
      "form_factor",
      "ram_type",
    ],
    ram: [
      "manufacturer",
      "model",
      "price",
      "power",
      "specifications",
      "available",

      "ram_type",
      "memory_size",
      "speed",
      "CAS_latency",
    ],
    gpu: [
      "manufacturer",
      "model",
      "price",
      "power",
      "specifications",
      "available",

      "gpu_boost_clock",
      "memory",
      "memory_type",
      "benchmark",
    ],
    power: [
      "manufacturer",
      "model",
      "price",
      "power",
      "specifications",
      "available",

      "efficiency_rating",
      "wattage",
      "form_factor",
      "modular",
    ],
    case: [
      "manufacturer",
      "model",
      "price",
      "power",
      "specifications",
      "available",

      "form_factor",
      "PSU",
      "height",
      "length",
    ],
    nvme: [
      "manufacturer",
      "model",
      "price",
      "power",
      "specifications",
      "available",

      "write",
      "read",
      "capacity",
      "TBW",
    ],
    ssd: [
      "manufacturer",
      "model",
      "price",
      "power",
      "specifications",
      "available",

      "write",
      "read",
      "capacity",
      "TBW",
    ],
    hdd: [
      "manufacturer",
      "model",
      "price",
      "power",
      "specifications",
      "available",

      "capacity",
      "rpm",
      "cache",
      "interface",
    ],
    cooler: [
      "manufacturer",
      "model",
      "price",
      "power",
      "specifications",
      "available",

      "compatibility",
      "cooler_type",
      "fans",
      "fans_size",
    ],
  };

  return (
    <MediaSt>
      <DashboardSt>
        <section className="cell-label-input">
          <label className="label" htmlFor="genre">
            Products
          </label>
          <input className="select-arrow inputOnly" type="text" value={data.totalDocs} readOnly />
        </section>

        <section className="cell-label-input">
          <label className="label" htmlFor="genre">
            Component
          </label>
          <div className="select-arrow">
            <ArrowRightIcon className="sysIconArrowSelect" />
            <select
              className="input"
              name="genre"
              id="genre"
              value={params.component}
              onChange={(e) => {
                navigate(
                  `/admin/components/${e.currentTarget.value}?page=1&search=&available=&manufacturer=`
                );
              }}
            >
              <option value="cpu">cpu</option>
              <option value="mobo">mobo</option>
              <option value="ram">ram</option>
              <option value="gpu">gpu</option>
              <option value="power">power</option>
              <option value="case">case</option>
              <option value="nvme">nvme</option>
              <option value="ssd">ssd</option>
              <option value="hdd">hdd</option>
              <option value="cooler">cooler</option>
            </select>
          </div>
        </section>

        <section className="cell-label-input">
          <label className="label" htmlFor="genre">
            Available
          </label>
          <div className="select-arrow">
            <ArrowRightIcon className="sysIconArrowSelect" />
            <select
              className="input"
              name="genre"
              id="genre"
              value={available}
              onChange={(e) => {
                navigate(
                  `/admin/components/${params.component}?page=1&search=${search}&available=${e.currentTarget.value}&manufacturer=${manufacturer}`
                );
              }}
            >
              <option value="">all</option>
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          </div>
        </section>

        <section className="cell-label-input">
          <label className="label" htmlFor="genre">
            Manufacturer
          </label>
          <div className="select-arrow">
            <ArrowRightIcon className="sysIconArrowSelect" />
            <select
              className="input"
              name="manufacturer"
              id="manufacturer"
              value={manufacturer}
              onChange={(e) => {
                navigate(
                  `/admin/components/${params.component}?page=1&search=${search}&available=${available}&manufacturer=${e.currentTarget.value}`
                );
              }}
            >
              {jsonComponents[params.component]
                .find((i: any) => i.key === "manufacturer")
                .options.map((i: any) => (
                  <option value={i} key={i}>
                    {i === "" ? "all" : i}
                  </option>
                ))}
            </select>
          </div>
        </section>

        <section className="cell-label-input">
          <label className="label" htmlFor="">
            Pages: {data.totalPages}
          </label>

          <section className="select-arrow pagination">
            {page > 1 ? (
              <>
                <Link
                  to={`?page=1&search=${search}&available=${available}&manufacturer=${manufacturer}`}
                  type="button"
                  className="btn arrow"
                >
                  <MdFirstPage className="sysIconArrow" />
                </Link>

                <Link
                  to={`?page=${
                    parseInt(page) - 1
                  }&search=${search}&available=${available}&manufacturer=${manufacturer}`}
                  type="button"
                  className="btn text"
                >
                  <MdKeyboardArrowLeft className="sysIconArrow" />
                </Link>
              </>
            ) : (
              <>
                <div></div>
                <div></div>
              </>
            )}

            <button type="button" className="btn text">
              {data.page}
            </button>

            {page < data.totalPages ? (
              <>
                <Link
                  to={`?page=${
                    parseInt(page) + 1
                  }&search=${search}&available=${available}&manufacturer=${manufacturer}`}
                  type="button"
                  className="btn text"
                >
                  <MdKeyboardArrowRight className="sysIconArrow" />
                </Link>

                <Link
                  to={`?page=${data.totalPages}&search=${search}&available=${available}&manufacturer=${manufacturer}`}
                  type="button"
                  className="btn arrow"
                >
                  <MdLastPage className="sysIconArrow" />
                </Link>
              </>
            ) : (
              <div></div>
            )}
          </section>
        </section>

        <section className="cell-label-input">
          <label className="label">Search</label>
          <input
            className="select-arrow search"
            type="text"
            defaultValue={search}
            onChange={handleSearch}
            onFocus={(e) => e.currentTarget.select()}
          />
        </section>

        <section className="cell-label-input">
          <label className="label" htmlFor="genre"></label>
          <Link className="select-arrow addMedia" to={`/admin/add-component/${params.component}`}>
            Add
          </Link>
        </section>
      </DashboardSt>
      <TableSt>
        <div className="tRow sticky-top">
          <div className="cell head">#</div>
          {headers[params.component].map((i: any) => (
            <div className="cell head" key={i}>
              {i}
            </div>
          ))}
          {/* <div className="cell head">Manufacturer</div>
          <div className="cell head">Model</div>
          <div className="cell head">Price (MSRP)</div>
          <div className="cell head">Power</div>
          <div className="cell head">Specifications</div> */}

          <div className="cell head">Editar</div>
          <div className="cell head">Borrar</div>
        </div>

        {data.docs?.map((i: any) => (
          <div className="tRow" key={i._id}>
            <div className="cell image-container">
              <img
                className="image"
                src={`${process.env.REACT_APP_BACKEND_URL}/static/${i.type}/${i.imageS[0]}`}
                alt=""
              />
              <img
                className="afuera"
                src={`${process.env.REACT_APP_BACKEND_URL}/static/${i.type}/${i.imageS[0]}`}
                alt=""
              />
            </div>

            {headers[params.component].map((e: any) => (
              <div
                className="cell"
                key={e}
                style={
                  i[e]?.length === 0 ||
                  i[e] === "" ||
                  i[e] === 0 ||
                  i[e] === "undefined" ||
                  i[e] === "false"
                    ? { color: "#ff004c" }
                    : e === "price"
                    ? { color: "#00ffa6" }
                    : e === "power"
                    ? { color: "#ffe100" }
                    : { background: "" }
                }
                title={e === "specifications" ? i[e].length : i[e]}
              >
                {e === "specifications" ? i[e].length : i[e]}
              </div>
            ))}
            {/* <div className="cell"> {i.manufacturer}</div>
            <div className="cell">{i.model}</div>
            <div className="cell">{i.price}</div>
            <div className="cell">{i.power}</div>
            <div className="cell">{i.form_factor}</div> */}

            <Link
              className="cell action-btn "
              to={`/admin/update-component/${params.component}?id=${i._id}`}
            >
              <EditIcon />
            </Link>
            <Link
              className="cell action-btn "
              to={`/admin/delete-component?component=${i.type}&id=${i._id}`}
            >
              <DeleteIcon />
            </Link>
          </div>
        ))}
      </TableSt>

      {/* <Outlet /> */}
    </MediaSt>
  );
};

export default Components;
