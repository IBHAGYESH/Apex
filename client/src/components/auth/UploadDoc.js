import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { useStyles } from "./css/UploadDoc_css";
import { useDispatch, useSelector } from "react-redux";
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import axiosCalls from "../api/axiosCalls";
import DoneIcon from '@material-ui/icons/Done';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

export default function UploadDoc() {

    const [profileimg , setProfileimg] = React.useState(null)
    const [aadharfrontimg , setAadharfrontimg] = React.useState(null)
    const [aadharBackimg , setAsdharbackimg] = React.useState(null)
    const classes = useStyles();
    const dispatch = useDispatch();
    const activeStep = useSelector(state =>({
        next: state.next,
        step1: state.step1,
        data: state.data,
        ...state
    }))  
 
  const nextstep = async (e)=>{

    const data = {
        profileimage:profileimg,
        aadharfrontimage:aadharfrontimg,
        aadharbackimage:aadharBackimg,
        username:activeStep.data.aadharNo,
        password:activeStep.data.password
        

    } 
    dispatch({type: 'reg_next',step2: true,'data':{
        profileimg:profileimg,
        aadharfrontimg:aadharfrontimg,
        aadharBackimg:aadharBackimg,
        ...activeStep
    }})
    dispatch({type: 'step2',step2: true})
    // api call registration
    await axiosCalls('POST','/userreg',data)
   
  }

  const headlCheger = (event,id)=>{
      console.log(event,id)
    if(id == 1){
           console.log("profile")
         setProfileimg(event)
    }
    else if(id == 2){
         console.log("Aadharfrontimg")
        setAadharfrontimg(event)
    }
    else if(id == 3){
         console.log("Asdharbackimg")
        setAsdharbackimg(event)
    }
  }

    return (
        <Container component="main" maxWidth="xs"  >
        
            <CssBaseline />
            <div className={classes.root}>
            <Grid container spacing={1} justify="center">
                
                {console.log(activeStep)}

                <Grid item xs={7} className={classes.passport} >
                    
                    <Paper className={classes.paper,classes.passportpic} component='div'>

                    
                        <label htmlFor="icon-button-file1" className={classes.centerIcon}>
                          <input accept=" .jpg,.jpeg,.png" className={classes.input} onChange={e=>headlCheger(e.target.files[0],1)} id="icon-button-file1" type="file" />
                            <IconButton color="inherit" aria-label="upload picture" component="span">
                            {profileimg == null ?<PhotoCamera  fontSize="large" />: <DoneIcon/>}
                            </IconButton>                         
                            
                        </label>
                        <label >Profile Photo</label>
                    </Paper>
                    
                </Grid>

                <Grid item xs={6} className={classes.doc}>
                <Paper className={classes.paper,classes.docpic}>
                        <input accept="image/*" className={classes.input} id="icon-button-file2" onChange={e=>headlCheger(e.target.files[0],2)} type="file" />
                        <label htmlFor="icon-button-file2" className={classes.docpicIcon}>
                            <IconButton color="inherit" aria-label="upload picture" component="span">
                            {aadharfrontimg == null ?<AddPhotoAlternateIcon fontSize="large"  />: <DoneIcon/>}
                            </IconButton>
                            
                        </label><br/>
                 <label >Aadhar Front Photo</label>
                  </Paper>
                </Grid>
                <Grid item xs={6} className={classes.doc}>
                <Paper className={classes.paper,classes.docpic}>
                        <input accept="image/*" className={classes.input} id="icon-button-file3" onChange={e=>headlCheger(e.target.files[0],3)} type="file" />
                        <label htmlFor="icon-button-file3" className={classes.docpicIcon}>
                            <IconButton color="inherit" aria-label="upload picture" component="span">
                            {aadharBackimg == null ?<AddPhotoAlternateIcon fontSize="large"  />: <DoneIcon/>}
                            </IconButton>
                           
                        </label><br/>
                    <label >Aadhar Back Photo</label>
                    </Paper>
                </Grid>
                
                
                
            </Grid>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={nextstep}
                >
                    Next
                </Button>
            </div>
        </Container>
    )
}
