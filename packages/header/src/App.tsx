import { useLayoutEffect, useState } from 'react';
import { Route, Router, Routes } from 'react-router-dom';
import './App.css';


// custom imports
import HeaderComponent from './components/header.component';


const App: React.FC<{ history: any, navigateTo: (routeTo: string) => void, profileMenuClickHandler:(menuItem:string)=>void, isAuthenticated:boolean }> = (props) => {

  console.log('header_App_component', props);

  const [state, setState] = useState({
    action: props?.history?.action,
    location: props?.history?.location
  })

  useLayoutEffect(() => props?.history.listen(setState), [props?.history])

  return <HeaderComponent navigateTo={props.navigateTo} profileMenuClickHandler={props.profileMenuClickHandler}/>
}

export default App;
