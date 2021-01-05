import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom"
import './index.css';
import { Fullstack } from './components/Fullstack';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Fullstack />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);