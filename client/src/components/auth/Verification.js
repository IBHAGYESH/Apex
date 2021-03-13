import React from 'react'
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Alert, AlertTitle } from '@material-ui/lab';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Link from '@material-ui/core/Link';
import { useStyles } from "./css/Verification_css";
import { useDispatch, useSelector } from "react-redux";


export default function Verification() {

    const classes = useStyles();

    const activeStep = useSelector(state =>({
        next: state.next,
        data: state.data,
        step1:state.step1,
        step1Info:state.step1Info,
        step2:state.step2,
        step2Info:state.step2Info,
        step3:state.step3,
        step3Info:state.step3Info, 
        ...state  
    }))  
    
      const dispatch = useDispatch()

      
const nextstep = ()=>{
          console.log('alert')

          if(activeStep.step3 == true){
              return(
              <Alert severity="success">
                <AlertTitle>Success </AlertTitle>
                Electronic voting  — <strong> <Link color="inherit" href="/login">Registration Success!</Link></strong>
                
              </Alert>
            )
          }
          else{
              return(
                  <Alert severity="error">
                        <AlertTitle>Incorrect OTP</AlertTitle>
                        Electronic voting — <strong><Link color="inherit" href="/">Incorrect OTP</Link></strong>
                  </Alert>
              )
          }
          
      }

    return (
        <Container component="main" maxWidth="xs"  >
        
            <CssBaseline />
            <div className={classes.root}>
                <Grid container spacing={2} className={classes.chip}>
                    <Chip
                        className={classes.spacing}
                        avatar={activeStep.step1 === true ? (<CheckCircleOutlineIcon style={{ color: '#64dd17' }}/>):(<HighlightOffIcon style={{ color: '#b71c1c'}}/>)}
                        label={activeStep.step1Info}
                        clickable
                        color="default"
                        size="medium"
                        deleteIcon={<DoneIcon />}
                        variant="outlined"
                    />
                    <Chip
                        className={classes.spacing}
                        avatar={activeStep.step2 === true ? (<CheckCircleOutlineIcon style={{ color:'#64dd17'  }}/>):(<HighlightOffIcon style={{ color: '#b71c1c'}}/>)}
                        label={activeStep.step2Info}
                        clickable
                        color="default"
                        size="medium"
                        deleteIcon={<DoneIcon />}
                        variant="outlined"
                    />
                    <Grid item xs={6} className={classes.otp}>
                        <TextField
                            variant="outlined"
                            required
                            id="OTP"
                            label="OTP Code"
                            name="OTP"
                            autoComplete="OTP"
                           
                            inputProps={{
                                maxLength: 6
                            }}
                            
                            autoFocus
                        />
                 </Grid>
                             
                </Grid>
                <Button
                        style={{marginTop:'40px',width:'50%'}}
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={nextstep}
                    >
                        Submit{console.log(activeStep.step1)}
                </Button> 
                
            </div>
        </Container>
    )
}

