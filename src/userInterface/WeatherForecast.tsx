import React, {useEffect} from "react";
import {StyleSheet, Text, View} from "react-native";
import {Navbar} from "./Navbar";
import {
    getWeatherForecastTC,
    RequestStatusType,
    WeatherDataType,
} from "../businessLogicLayer/appReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../businessLogicLayer/store";

export const WeatherForecast = () => {

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const longitude = position.coords.longitude
            const latitude = position.coords.latitude
            dispatch(getWeatherForecastTC(longitude, latitude))
        })
    }, [])

    const dispatch = useDispatch()
    const weatherData = useSelector<AppRootStateType, WeatherDataType>(state => state.app.weatherData)
    const appStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    return (
        <>
            <Navbar title={"Weather forecast"}/>
            {appStatus === "loading"
                ? <Text>loading</Text>
                : <View style={styles.block}>
                    <Text style={styles.weatherData}>City: {weatherData.city}</Text>
                    <Text style={styles.weatherData}>Temp: {weatherData.temp}°C</Text>
                    <Text style={styles.weatherData}>
                        Description: {weatherData.weather
                        ? weatherData.weather[0].description
                        : null
                    }
                    </Text>
                </View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    block: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    weatherData: {
        fontSize: 20,
        paddingBottom: 10
    }
})