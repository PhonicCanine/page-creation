import React from 'react';
import logo from './logo.svg';
import './App.css';
import Stepper from '@material-ui/core/Stepper';
import { MobileStepper, Step, StepLabel } from '@material-ui/core';
import MobileProcess from './MobileProcess';

{/* <Step title="Select a patient">
<StepLabel>Select a patient</StepLabel>
</Step>
<Step title="Select a recipient">
<StepLabel>Select a recipient</StepLabel>
</Step>
<Step title="Describe what you want">
<StepLabel>Describe what you want</StepLabel>
</Step> */}

function App() {
  return (
    <div style={{height: "100vh", width: "100vw"}}>
      <MobileProcess/>
    </div>
    
  );
}

export default App;
