import { FC, useEffect } from "react";
import { Header } from "./components/header";
import Router from "./Router";
import './App.css'
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { fetchUserWeights, listenAuthState, selectIsSignedIn, selectUsername, selectNickname } from './features/users/usersSlice'

const App: FC = () => {
  const dispatch = useAppDispatch();
  const isSignedIn = useAppSelector(selectIsSignedIn)
  useEffect(() => {
    if(!isSignedIn) {
      dispatch(listenAuthState())
    } else {
      dispatch(fetchUserWeights(undefined))
    }
  },[isSignedIn, dispatch])
  return (
    <>
      <Header />
      <Router />
    </>
  );
};

export default App;
