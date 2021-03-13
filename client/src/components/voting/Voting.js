import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Timer from 'react-compound-timer'
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Copyright } from "../Copyright";
import { useStyles } from "./css/Voting_css";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import Paper from '@material-ui/core/Paper';
import { makeStyles, useTheme } from '@material-ui/core/styles';
export default function Voting() {
  const classes = useStyles();
  const theme = useTheme();
  const sublimeVote = () =>{
    

    
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Timer
                //mili sec * hr * day
                initialTime={60000 * 2 }
                direction="backward"
                checkpoints={[
                    {
                        time: 0 * 2 * 2,
                        callback: () => console.log(0),
                         
                    }
                ]}
            >
                
              
                    <div style={{marginTop:'20px',textAlign:'center',fontSize:'20px'}}>
                      <Timer.Minutes /> Min
                       &nbsp;&nbsp;&nbsp;
                      <Timer.Seconds /> Sec
                    </div>
                    
                
                
                
            </Timer>
          <Card className={classes.root}>
          
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                Live From Space
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Mac Miller
              </Typography>
            </CardContent>
            <div className={classes.controls}>
              
              <IconButton aria-label="vote" onClick={sublimeVote}>
                <HowToVoteIcon className={classes.voteIcon} />
              </IconButton>
              
            </div>
          </div>
          <CardMedia
            className={classes.cover}
            image="/static/images/cards/live-from-space.jpg"
            title="party"
          />
        </Card>
      <Box mt={8} style={{justifyContent:'center',display:'flex'}}>
        <Copyright />
      </Box>
    </Container>
  );
}