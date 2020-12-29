import {Dispatch} from "redux";
import {appApi} from "../dataAccessLayer/appApi";
import {Alert} from "react-native";

const initialState = {
    status: "idle" as RequestStatusType,
    isLoggedIn: false,
    weatherData: {} as WeatherDataType
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "APP/SET_IS_LOGGED_IN":
            return {...state, isLoggedIn: action.isLoggedIn}
        case "APP/SET_CURRENT_WEATHER":
            return {...state, weatherData: {city: action.city, temp: action.temp , weather: action.weather}}
        default:
            return state
    }
}

export const setIsLoggedInAC = (isLoggedIn: boolean) => ({type: "APP/SET_IS_LOGGED_IN", isLoggedIn} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: "APP/SET_STATUS", status} as const)
const setCurrentWeather = (city: string, weather: Array<WeatherType>, temp: number) =>
    ({type: "APP/SET_CURRENT_WEATHER", city, weather, temp} as const)

export const getWeatherForecastTC = (longitude: number, latitude: number) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await appApi.getWeatherForecast(longitude, latitude)
        dispatch(setCurrentWeather(res.data.name, res.data.weather, Math.round(res.data.main.temp - 273.15)))
    } catch (e) {
        Alert.alert(e.message)
    }
    dispatch(setAppStatusAC('succeeded'))
}

type ActionsType =
    ReturnType<typeof setIsLoggedInAC> |
    ReturnType<typeof setCurrentWeather> |
    ReturnType<typeof setAppStatusAC>

export type InitialStateType = typeof initialState

export type WeatherDataType = {
    city: string
    temp: number
    weather: Array<WeatherType>
}

export type WeatherType = {
    id: number
    main: string
    description: string
    icon: string
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';