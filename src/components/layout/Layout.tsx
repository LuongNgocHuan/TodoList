
import { Route, Navigate, Routes } from 'react-router-dom';
import PinCode from '../../pages/PinCode';
import SetCode from '../../pages/SetCode';
import App from '../../App';
import { useState } from 'react';

const Layout = () => {
  const [pinMatched, setPinMatched] = useState(false)
  return (
    <div className="">
      <Routes>
        <Route path="/set-code" element={<SetCode />} />
        <Route path="/pin-code" element={<PinCode onSuccess={()=> setPinMatched(true)}/>} />
        <Route path="/" element={pinMatched ? <ProtectedApp /> :  <Navigate to="/pin-code" replace />} />
      </Routes>
    </div>
  );
};

const ProtectedApp = () => {
  const pinCode = localStorage.getItem('code');

  const [inputPin, setInputPin] = useState(false)

  if (!pinCode) {
    return <Navigate to="/set-code" replace />;
  } 

  if(!inputPin){
    <Route path="/pin-code" element={<PinCode onSuccess={ () => setInputPin(true)} />} />
  }

  return <App/>;
  
  
};

export default Layout;