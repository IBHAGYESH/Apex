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
import {axiosCalls,axiosCallsFile} from "../api/axiosCalls";
import axios from "axios";
import DoneIcon from '@material-ui/icons/Done';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { AssistantTwoTone } from '@material-ui/icons';
import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCmvp-4HZC16tgi6zdvSbPdLjEvZiI1UWw",
    authDomain: "apex-5c532.firebaseapp.com",
    projectId: "apex-5c532",
    storageBucket: "apex-5c532.appspot.com",
    messagingSenderId: "61266754390",
    appId: "1:61266754390:web:2196c8cc98f0d749a574f7",
    measurementId: "G-HZ0T9009ZM"
  };
  firebase.initializeApp(firebaseConfig);

var storage = firebase.storage();

export default function UploadDoc() {
 const classes = useStyles();
    const dispatch = useDispatch();
    const activeStep = useSelector(state =>({
        next: state.next,
        step1: state.step1,
        data: state.data,
        profileimg:state.profileimg,
        aadharfrontimg:state.aadharfrontimg,
        aadharBackimg:state.aadharBackimg,
        ...state
    }))  
    const [profileimg , setProfileimg] = React.useState(null);
    const [profileimgURL , setProfileimgURL] = React.useState();
    const [aadharfrontimg , setAadharfrontimg] = React.useState(null);
    const [aadharfrontimgURL , setAadharfrontimgURL] = React.useState();
    const [aadharBackimg , setAsdharbackimg] = React.useState(null);
    const [aadharBackimgURL , setAsdharbackimgURL] = React.useState(); 

   
 
  const nextstep = async (e)=>{
     dispatch({type: 'reg_next',step2: true,'data':{
             profileimg:profileimg,
            aadharfrontimg:aadharfrontimg,
             aadharBackimg:aadharBackimg,
           ...activeStep
        }})
         dispatch({type: 'step2',step2: true})
     var data = {
        profileimg:activeStep.profileimgURL,
        aadharfrontimg:activeStep.aadharfrontimgURL,
        aadharBackimg:activeStep.aadharBackimgURL,
        username:activeStep.data.aadharNo,
        password:activeStep.data.password
   }
        console.log('====>',activeStep)
    // api call registration
    await axiosCallsFile('POST','/userreg',data)
   
  }

  const headlCheger = (event,id)=>{
      console.log(event,id)
      //var img1= event.target.files[0];
    if(id == 1){
           
        

        
       //dispatch({type: 'profileimg','profileimg':img1})
        // setProfileimg(img1);
        var img1= event.target.files[0];
        //dispatch({type: 'profileimgURL',profileimg: img1});
         console.log('--->',activeStep.profileimg,'--->',img1)
         const uploadimg = storage.ref('img'+img1.name).put(img1);
         uploadimg.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            dispatch({type: 'profileimgURL',profileimgURL: downloadURL});
            dispatch({type: 'profileimg',profileimg: img1});
          });
           
         
    }
    else if(id == 2){
        var img1= event;
        setAadharfrontimg(event) 
        console.log(aadharfrontimg)
        console.log('--->',activeStep.profileimg,'--->',img1)
        const uploadimg = storage.ref('img'+img1.name).put(img1);
        uploadimg.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            dispatch({type: 'aadharfrontimg',aadharfrontimg: img1});
            dispatch({type: 'aadharfrontimgURL',aadharfrontimgURL: downloadURL});
          });
    }
    else if(id == 3){
        var img1= event;
        setAsdharbackimg(event)
        console.log(aadharBackimg)
        console.log('--->',activeStep.profileimg,'--->',img1)
         const uploadimg = storage.ref('img'+img1.name).put(img1);
         uploadimg.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            dispatch({type: 'aadharBackimg',aadharBackimg: img1});
            dispatch({type: 'aadharBackimgURL',aadharBackimgURL: downloadURL});
          });
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
                          <input accept=" .jpg,.jpeg,.png" className={classes.input} onChange={e=>headlCheger(e,1)} id="icon-button-file1" type="file" />
                            <IconButton color="inherit" aria-label="upload picture" component="span">
                            {profileimg == null && profileimg == '' ?<PhotoCamera  fontSize="large" />: <DoneIcon/>}
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
