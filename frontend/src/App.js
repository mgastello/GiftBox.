import { Route, Switch } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Login from "./components/LoginPage/Login";
import Signup from "./components/SignupPage/Signup";
import Navigation from "./components/Navigation/Navigation"

function App() {
  return (
    <>
      <Switch>
        <Route exact path='/'>
          <Navigation />
          <Landing />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>
      </Switch>
    </>
  );
}

export default App;
