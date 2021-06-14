import { Route, Switch } from "react-router-dom"
import {  History, Home, InputWeight, UserInfo } from "./templates"


const Router = () => {
  return (
    <Switch>
        <Route exact path={"(/)?"} component={Home} />
        <Route exact path={'/input-weight'} component={InputWeight} />
        <Route path={'/input-weight/:weightId'} component={InputWeight} />
        <Route exact path={"/user-info"} component={UserInfo} />
        <Route exact path={"/history"} component={History} />
    </Switch>
  )
}

export default Router
