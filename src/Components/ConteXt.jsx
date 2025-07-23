import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  let [CurrentUser, setCurrentuser] = useState(null);
  let [All_Details_User,setAll_details]=useState([])
  let [loading, setLoading] = useState(true);

  let funCurrentUser = async () => {
    try {
      let res = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/Users/currentUser",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCurrentuser(res.data.group.name);
      setAll_details(res.data)
      console.log("CurrentUser updated to:", res.data.group.name); 
    } catch (error) {
      console.log("Error fetching current user:", error);
      setCurrentuser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    funCurrentUser();
  }, []);

  return (
    <AuthContext.Provider value={{ CurrentUser, funCurrentUser, loading,All_Details_User }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;