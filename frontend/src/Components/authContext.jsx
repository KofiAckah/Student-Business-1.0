import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("chat-user")) || null
  );

  useEffect(() => {
    if (auth) {
      localStorage.setItem("chat-user", JSON.stringify(auth));
    } else {
      localStorage.removeItem("chat-user");
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// import { createContext, useContext, useState } from "react";

// export const AuthContext = createContext();

// // eslint-disable-next-line react-refresh/only-export-components
// export const useAuthContext = () => {
//   return useContext(AuthContext);
// };

// // eslint-disable-next-line react/prop-types
// export const AuthContextProvider = ({ children }) => {
//   const [auth, setAuth] = useState(
//     JSON.parse(localStorage.getItem("chat-user")) || null
//   );

//   return (
//     <AuthContext.Provider value={{ auth, setAuth }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
