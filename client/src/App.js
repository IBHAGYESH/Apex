
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration";
import CustomizedSteppers from "./components/auth/CustomizedSteppers";
import Countdown from "./components/countdown/Countdown"
import { useDispatch, useSelector } from "react-redux";
import {Redirect} from 'react-router-dom';
import Voting from "./components/voting/Voting"

const theme = createMuiTheme({
  palette: {
    type: "dark",
  }
});


function App() {

  const active = useSelector(state =>({
    isLogin: state
  
})) 
  
  return (
    <>  
      
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              
              
              <Switch>

                <Route exact path="/">
                  
                </Route>
                <Route exact path="/login">
                  <Login/>
                </Route>
                <Route exact path="/registration">
                  <CustomizedSteppers />
                </Route>
                <Route exact path="/slot">
                  <Countdown /> 
                </Route>
                <Route exact path="/voting">
                  <Voting />
                </Route>
                
                
              </Switch>

              

            </ThemeProvider>
          </BrowserRouter>  
        </>
  );
}

export default App;
