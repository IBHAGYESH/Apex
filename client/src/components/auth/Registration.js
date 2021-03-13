import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import { Copyright } from "../Copyright";
import { useStyles } from "./css/registration_css";
import { useDispatch, useSelector } from "react-redux";
import axiosCalls from "../api/axiosCalls";
import base64 from "base-64";
export default function Registration() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [check , setCheck] = React.useState(false);
  const [aadharNo , setAadharNo] = React.useState(0);
  const [phonecheck , setPhoneCheck] = React.useState(false);
  const [phoneno , setPhoneNo] = React.useState(0);
  const [password, setPassword] = React.useState(null);
  const [matchpassword, setMatchpassword] = React.useState(false);
  const [toggleCheckbox, setToggleCheckbox] = React.useState('deny');
  const [getdata, setGetdata] = React.useState(null)
  

//   const nextstep = ()=>{
//     dispatch({type: 'reg_next',step1: true,'data':{}})
//     dispatch({type: 'step1',step1: true,'data':{}})
//   }

  const sublimeRegistration = (e)=>{
    e.preventDefault();
    if(aadharNo != null && phoneno != null && matchpassword != null && toggleCheckbox != null){
        dispatch({type: 'reg_next',step1: true,'data':{
            'aadharNo':aadharNo,
            'phoneno':phoneno,
            'password':password,
            'voteAllow':toggleCheckbox
            
        }})
        dispatch({type: 'step1',step1: true})
    }
    
  }
  const checkAadhar = (aadharNo)=>{
    if(String(aadharNo).length === 12){
        console.log('ok',typeof(aadharNo) )
        setCheck(true)
        setAadharNo(aadharNo)
        
        
    }
    else{
        setCheck(false)
    }

  }
 const checkPhone = async (phone_no)=>{
    if(String(phone_no).length === 10 ){
        
        setPhoneNo(phone_no)
        console.log('ok',typeof(phoneno))
        setPhoneCheck(true)
        const data = base64.encode(`aadharnumber:${aadharNo}:mobilenumber:${phoneno}`)
       
            await axiosCalls('GET','/getadata',data)
            .then(res=>{
                console.log(res)
                setGetdata(res.data)
            }

            )
            .catch(error=>console.log(error))
            

    }
    else{
        setPhoneCheck(false)
    }
 }
  const handleChange = (event,cevent) => {

    if(event.length === 8){
        setPassword(event);
    }
    else if(password === cevent){
        setMatchpassword(false)
    }
    else if(password !== cevent){
        setMatchpassword(true)
    }
    else{
        setMatchpassword(false)
        
    }
 
  }


  return (
      
        
        <Container component="main" maxWidth="xs"  >
        <CssBaseline />
        <div className={classes.paper}>
            
            <Typography component="h1" variant="h5">
            Registration
            </Typography>
            
            <form className={classes.form} noValidate method='post' onSubmit={sublimeRegistration}>
            <Typography component="h2" variant="h6" style={{textAlign: 'center',marginBottom:'10px'}}>
             { getdata == null ? `` : `Name: ${getdata.fname} ${getdata.lname}` }
            </Typography>
            <Grid container spacing={2}>
                
                <Grid item xs={12} sm={10}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="aadhar_card_number"
                    label="Aadhar Card Number"
                    name="aadhar_card_number"
                    autoComplete="aadhar_card_number"
                    onChange={e=>checkAadhar(Number(e.target.value))}
                    inputProps={{
                        maxLength: 12
                    }}
                    
                    autoFocus
                />
                </Grid>
                <Grid item xs={12} sm={1} style={{alignSelf: "center"}}>
                    {check == true ? (<DoneIcon style={{color:'#008000'}} fontSize="large" />):(<CloseIcon color="error" fontSize="large"/>)}
                </Grid>
                
                {/* <Grid item xs={12} sm={9}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="election_card_number"
                    label="Election Card Number"
                    name="election_card_number"
                    autoComplete="election_card_number"
                />
                </Grid>
                <Grid item xs={12} sm={1}>
                <Button variant="outlined" color="inherit" style={{height:'56px'}}>
                    {}
                </Button>
                </Grid> */}

                <Grid item xs={12} sm={10}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="phone_no"
                    label="Phone Number (link your aadhar card)"
                    name="phone_no"
                    autoComplete="phone_no"
                    onChange={e=>checkPhone( Number(e.target.value))}
                    inputProps={{
                        maxLength: 10
                    }}
                />
                </Grid>
                <Grid item xs={12} sm={1} style={{alignSelf: "center"}}>
                    {phonecheck == true ? (<DoneIcon style={{color:'#008000'}} fontSize="large" />):(<CloseIcon color="error" fontSize="large"/>)}
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={e=>handleChange(e.target.value)}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="confirm_password"
                    label="Confirm Password"
                    type="password"
                    id="confirm_password"
                    autoComplete="current-password"
                    onChange={e=>handleChange( 1,e.target.value)}
                    error={matchpassword}
                />
                </Grid>
                <Grid item xs={12}>
                <FormControlLabel
                    control={<Checkbox value="allow" color="primary"  onChange={()=>setToggleCheckbox('allow')}/>}
                    label="I have read and accept the Terms & Conditions and the Privacy Policy. & I confirm that I am over 18 years old."
                />
                </Grid>
            </Grid>


            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                
            >
                Next
            </Button>



            <Grid container justify="flex-end">
                <Grid item>
                <Link href="#" variant="body2">
                    Already have an account? 
                </Link>
                </Grid>
            </Grid>
            </form>
        </div>
        <Box mt={5}>
            <Copyright />
        </Box>
        </Container>
    
  );
}