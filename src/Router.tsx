import { Route, Switch } from "react-router-dom"
import {  AverageWeightData, Calender, History, Home, InputWeight, UserInfo } from "./templates"


const Router = () => {
  return (
    <Switch>
        <Route exact path={"(/)?"} component={Home} />
        <Route exact path={'/input-weight'} component={InputWeight} />
        <Route path={'/input-weight/:weightId'} component={InputWeight} />
        <Route exact path={"/user-info"} component={UserInfo} />
        <Route exact path={"/history"} component={History} />
        <Route exact path={"/calender"} component={Calender} />
        <Route exact path={"/average-weight"} component={AverageWeightData} />
    </Switch>
  )
}

export default Router
