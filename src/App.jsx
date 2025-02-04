import Product from "components/Product";
import ProductList from "components/ProductList";
import { Route, Switch, Redirect } from "react-router-dom";

import PageNotFound from "./components/commons/PageNotFound";

const App = () => (
  <Switch>
    <Route exact component={Product} path="/product/:slug" />
    <Route exact component={ProductList} path="/products" />
    <Redirect exact from="/" to="/products" />
    <Route exact component={PageNotFound} path="*" />
  </Switch>
);

export default App;
