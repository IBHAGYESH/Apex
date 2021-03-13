import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Timer from 'react-compound-timer'
import Box from '@material-ui/core/Box';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useStyles } from "./css/Countdown_css";
import { Copyright } from "../Copyright";
import Paper from '@material-ui/core/Paper';
import {Redirect} from 'react-router-dom';
export default function Countdown() {
  const classes = useStyles();
  
  const sublimeLogin = (e) =>{
    e.preventDefault();

    
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <TimelapseIcon />
        </Avatar>
        <Typography>
            {'After this time you can vote '}
        </Typography>

        <div className={classes.root}>
            <Timer
                //mili sec * hr * day
                initialTime={3000 }
                direction="backward"
                checkpoints={[
                    {
                        time: 0 * 0 * 0,
                        callback: () => <Redirect to='/' />,
                         
                    }
                ]}
            >
                
                <Paper elevation={3} className={classes.timer}>
                    <Timer.Days /> D
                </Paper>
                <Paper elevation={3} className={classes.timer}>
                    <Timer.Hours /> Hr
                </Paper>
                <Paper elevation={3} className={classes.timer}>
                    <Timer.Minutes /> Min
                </Paper>
                <Paper elevation={3} className={classes.timer}>
                    <Timer.Seconds /> Sec
                </Paper>
                
                
            </Timer>
        </div>

        
        
      </div>
      <Box mt={8} style={{justifyContent:'center',display:'flex'}}>
        <Copyright />
      </Box>
    </Container>
  );
}