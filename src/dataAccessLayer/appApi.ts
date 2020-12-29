import axios from "axios"

const instance = axios.create({
    baseURL: `http://api.openweathermap.org/data/2.5/`
})

const API_KEY = "78c6583d11ca7ce54c2463edf4c8c46b"

export const appApi = {
    getWeatherForecast: (lon: number, lat: number) => {
        return instance.get(`weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    }
}