import { Route, Switch } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Login from "./components/LoginPage/Login";
import Signup from "./components/SignupPage/Signup";
import Navigation from "./components/Navigation/Navigation";
import MyWishlist from "./components/Wishlist/MyWishlist";

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
        <Route path='/mywishlists'>
          <Navigation />
          <MyWishlist />
        </Route>
      </Switch>
    </>
  );
}

export default App;
