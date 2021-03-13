import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    
  },
  passport:{
    width: 128,
    height: 200,
   
  },
  passportpic:{
    height: 182,
    textAlign: 'center',
  },
  centerIcon:{
    lineHeight: '200px',
  },
  doc: {
    width: 128,
    height: 150,
    
  },
  docpic:{
    
    textAlign: 'center',
    height: 140,
  },
  docpicIcon:{
    
    lineHeight: '140px',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  input: {
    display: 'none',
    alignItems: 'center'
  },
}));