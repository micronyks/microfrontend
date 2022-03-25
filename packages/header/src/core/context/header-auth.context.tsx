// import * as React from 'react';
// import { IHeaderAuth } from '../interfaces/header-auth.interface';

// const defaulHeaderAuthtState: IHeaderAuth = {
//   isAuthenticated: false,
// };

// export const HeaderAuthContext = React.createContext<IHeaderAuth>(defaulHeaderAuthtState);


// const HeaderAuthProvider: React.FC = ({ children }) => {
//   const [headerAuthentication, setheaderAuthentication] = React.useState(defaulHeaderAuthtState.isAuthenticated)

//   const setUserAuthetication = (authetication: IHeaderAuth) => {
//     setheaderAuthentication(authetication.isAuthenticated);
//   }

//   return (
//     <HeaderAuthContext.Provider value={{ headerAuthentication, setUserAuthetication: () => { } }}> {children} </HeaderAuthContext.Provider>
//   )

// }


// export default HeaderAuthProvider;


