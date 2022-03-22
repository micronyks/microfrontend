import { useLayoutEffect, useState } from 'react';
import { Routes, Route, Router, Navigate } from 'react-router-dom';
import './App.css';

// custom imports
import DashboardTileComponent from './components/dashboard-tile-view.component';
import DashboardSpeedoMeterViewComponent from './components/dashboard-speedometer-view.component';
import DashboardMapViewComponent from './components/dashboard-map-view.component';

const App: React.FC<{ history: any }> = (props) => {

  const [state, setState] = useState({
    action: props.history.action,
    location: props.history.location
  })

  useLayoutEffect(() => props.history.listen(setState), [props.history])

  return (<div>
    <Router {...props} location={state.location} navigator={props.history} navigationType={state.action}>
      <Routes >
        <Route path='/dashboard/speedometerview' element={<DashboardSpeedoMeterViewComponent />} />
        <Route path='/dashboard/mapview' element={<DashboardMapViewComponent />} />
        <Route path='/dashboard/tileview' element={<DashboardTileComponent />} />
        <Route path='/dashboard' element={<Navigate to='/dashboard/tileview' />} /> 
        <Route path='/' element={<Navigate to='/dashboard' />} />
      </Routes>
    </Router>
  </div>);
}

export default App;
