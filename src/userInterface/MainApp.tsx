import React from "react";
import {SignIn} from "./SignIn";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../businessLogicLayer/store";
import {WeatherForecast} from "./WeatherForecast";

export const MainApp = () => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.app.isLoggedIn)

    return (
        <>
            {
                !isLoggedIn
                    ? <SignIn/>
                    : <WeatherForecast/>
            }
        </>
    )
}
