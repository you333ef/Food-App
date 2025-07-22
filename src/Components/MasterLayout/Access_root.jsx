import { useContext } from "react";
import { AuthContext } from "../ConteXt";
import { Navigate } from "react-router-dom";
import { Circles } from 'react-loader-spinner';

export default function Access_root({ children }) {
  let { CurrentUser } = useContext(AuthContext);
  let location=window.location.pathname
  console.log("CurrentUser:", CurrentUser);

 if (!CurrentUser) {
  return <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Circles
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="circles-loading"
        visible={true}
      />
    </div>
}
if(location==='Fav' && CurrentUser!=='SuperAdmin'){
    return children

}
if (CurrentUser !== "SuperAdmin") {
  return <Navigate to="/Login" replace />;
}




return children;

}