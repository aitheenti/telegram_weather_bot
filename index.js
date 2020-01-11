require('dotenv').config()
const fetch = require('node-fetch');
const telegramBot = require('node-telegram-bot-api');
const bot = new telegramBot(process.env.TELEGRAM_TOKEN)

const  weatherToken = process.env.WEATHER_API_TOKEN;

const weatherURL = new URL('https://api.openweathermap.org/data/2.5/weather')
weatherURL.searchParams.set("zip",  '48226,US')
weatherURL.searchParams.set("APPID", weatherToken)
weatherURL.searchParams.set("units", 'imperial')

const getWeatherData = async() => {
   const resp = await fetch(weatherURL.toString());
   const body = await resp.json()
   return body
}

const generateWeatherMessage = weatherData => 
    `Today's weather in ${weatherData.name} : ${weatherData.weather[0].description} ${weatherData.main.temp} with a high of ${weatherData.main.temp_max} and a low of ${weatherData.main.temp_min}`;


const main = async () => {
    const weatherData = await getWeatherData()
    const weatherString = generateWeatherMessage(weatherData)
    bot.sendMessage(process.env.TELEGRAM_CHAT_ID,weatherString);
    console.log(weatherString);
}


main();