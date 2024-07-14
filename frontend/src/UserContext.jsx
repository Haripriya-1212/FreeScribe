// import React, { createContext, useState } from 'react';

// export const UserContext = createContext({});

// export function UserContextProvider({children}){
//     const [userInfo, setUserInfo] = useState({});
//     return(
//         <UserContext.Provider value={{userInfo, setUserInfo}}>
//             {children}
//         </UserContext.Provider>
//     );
// }



import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState(() => {
    const savedUser = localStorage.getItem('userInfo');
    return savedUser ? JSON.parse(savedUser) : {};
  });

  useEffect(() => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }, [userInfo]);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}
