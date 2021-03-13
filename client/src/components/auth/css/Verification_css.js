import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      chip:{
        justifyContent: 'center',
        
      },
      spacing:{
        marginTop: theme.spacing(1),
        fontSize:'15px'
      },
      otp:{
        marginTop: theme.spacing(7),
      }
  }));