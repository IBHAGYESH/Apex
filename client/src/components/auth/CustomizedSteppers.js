import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { QontoConnector,useQontoStepIconStyles,useStyles } from "./css/CustomizedSteppers_css";
import Registration from "./Registration";
import UploadDoc from "./UploadDoc";
import Verification from "./Verification";
import Verify from './Verify'
import { useDispatch, useSelector } from "react-redux";


function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
};




function getSteps() {
  return ['Fill The Registration', 'Upload Documents', 'Verification'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Select campaign settings...';
    case 1:
      return 'What is an ad group anyways?';
    case 2:
      return 'This is the bit I really care about!';
    default:
      return 'Unknown step';
  }
}

export default function CustomizedSteppers() {
  const classes = useStyles();
  //const [activeStep, setActiveStep] = React.useState(0);
  const activeStep = useSelector(state =>({
    next: state.next,
    data: state.data
}))  

  const steps = getSteps();
  const dispatch = useDispatch();
  const handleNext = () => {
    dispatch({type: 'reg_next','data':{}});
  };

  const handleBack = () => {
    dispatch({type: 'reg_prev','data':{}});
  };

  const handleReset = () => {
    dispatch({type: 'reset','data':{}});
  };

  return (
  <>
    
    <div className={classes.root}>
     
      <Stepper className={classes.root} alternativeLabel activeStep={activeStep.next} connector={<QontoConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}>{label}{console.log(activeStep.next)}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      <div>
        {activeStep.next === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            {
                activeStep.next === 0 ?(<Registration/>):( activeStep.next === 1 ?<UploadDoc/> :activeStep.next === 2 ?<Verification/>:<Registration/>)
            }
            
          </div>
        )}
      </div>
    </div>
  </>
  );
}
