import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './style.scss';

const Alert = () => {

  

  return <ToastContainer enableMultiContainer containerId={'A'} position={toast.POSITION.TOP_RIGHT} />;
}

export default Alert;