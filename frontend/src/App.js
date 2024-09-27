import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <>
      <Switch>
        <Route exact path='/'>
          <h1>Hello from App</h1>
        </Route>
      </Switch>
    </>
  );
}

export default App;
