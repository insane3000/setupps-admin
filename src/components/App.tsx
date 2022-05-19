import { useEffect } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "components/admin/pages/Login";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider, QueryClient } from "react-query";
// *Fonts
import "fonts/fonts.css";
import styled from "styled-components";
import Admin from "components/admin/Admin";
import Error404 from "./Error404";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "redux/actions/appAction";
import { StoreInterface } from "interfaces/storeTemplate";

const AppSt = styled.div`
  width: 100vw;
  height: 100vh;
  background: #0c0c0c;
  .toast {
    width: auto;
    height: 3rem;
    background: #ffffff;
    font-family: "Roboto 300";
    font-size: 1rem;
    user-select: none;
  }
`;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      //       refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
    },
  },
});
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("token") !== "") {
      dispatch(setLogin(`${localStorage.getItem("token")}`, `${localStorage.getItem("id")}`));
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppSt id="app">
          <Toaster
            toastOptions={{
              className: "toast",
            }}
          />
          <Routes>
            {/* <Route
              path="/"
              element={
                <Navigate to={`/admin/components/cpu?page=1&search=&available=&manufacturer=`} />
              }
            /> */}
            <Route path="/" element={<Navigate to={"/login"} />} />
            <Route path="/admin/*" element={<Admin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<Error404 />} />
          </Routes>
        </AppSt>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
