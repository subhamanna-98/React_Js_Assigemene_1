import axios from "axios";
import { useEffect, useState, type FormEvent } from "react";
interface WeatherData {
  name: string;
  main: {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
  };
  weather: [
    {
      description: string;
      icon: string;
      id: number;
      main: string;
    },
  ];
  wind: {
    speed: number;
  };
  sys: {
    country: string;
  };
}
export const WeatherComponantes = () => {
  const API_KEY = "e420819f60996d38a277c8891a2c7847";
  const [inputCity, setInputCity] = useState<string>("");
  const [city, setCity] = useState<string>("Dhaka");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  useEffect(() => {
    if(!city.trim()) return
    const fetchData = async () => {
      setLoading(true);
      setError("")
      try {
        const respone = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather`,
          {
            params: {
              q: city,
              appid: API_KEY,
              units: "metric",
            },
          },
        );
        setWeather(respone?.data)
        
      } catch (error: any) {
        if (error.response?.status === 404) {
          setError("City not found. Please check the spelling.");
        } else if (error.response?.status === 401) {
          setError("Invalid or inactive API key. Please check your key.");
        } else {
          setError(error.message || "Failed to fetch weather data.");
        }
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [city]);
  const handleSearch = ((e: FormEvent) => {
    e.preventDefault();
    if(!inputCity.trim()) return;
    setCity(inputCity.trim());
    setInputCity("");
  })
  return (
    <>
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-sans text-slate-100">
      <div className="w-full max-w-md bg-slate-800/80 backdrop-blur-md rounded-3xl border border-slate-700/60 p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* হেডার */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-white">Weather Forecast</h1>
          <p className="text-xs text-slate-400">Search current weather by city name</p>
        </div>

        {/* সার্চ বার */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={inputCity}
            onChange={(e) => setInputCity(e.target.value)}
            placeholder="Enter city (e.g., London, Tokyo)"
            className="flex-1 rounded-xl bg-slate-950/60 border border-slate-700 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 active:scale-95 transition-all cursor-pointer"
          >
            Search
          </button>
        </form>

        {/* এরর স্টেট (City not found / Invalid Key) */}
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-center">
            <p className="text-xs font-semibold text-rose-400">{error}</p>
          </div>
        )}

        {/* লোডিং স্টেট */}
        {loading && (
          <div className="py-12 flex flex-col items-center justify-center space-y-3">
            <div className="w-8 h-8 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-slate-400 animate-pulse">Fetching weather data...</p>
          </div>
        )}

        {/* ওয়েদার কার্ড (Success State) */}
        {!loading && !error && weather && (
          <div className="space-y-6 pt-2">
            
            {/* শহর ও মূল তাপমাত্রা */}
            <div className="flex flex-col items-center text-center space-y-2">
              <span className="text-lg font-bold tracking-wide text-white">
                {weather.name}, {weather.sys.country}
              </span>

              {/* কন্ডিশন আইকন */}
              {weather.weather[0] && (
                <div className="flex flex-col items-center">
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                    alt={weather.weather[0].description}
                    className="w-24 h-24 -my-2 drop-shadow-md"
                  />
                  <span className="text-sm font-medium capitalize text-slate-300">
                    {weather.weather[0].description}
                  </span>
                </div>
              )}

              <div className="text-6xl font-extrabold tracking-tighter text-white pt-2">
                {Math.round(weather.main.temp)}°C
              </div>
              <span className="text-xs text-slate-400">
                Feels like {Math.round(weather.main.feels_like)}°C
              </span>
            </div>

            {/* অন্যান্য তথ্য (Humidity, Wind, Pressure) */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-700/60">
              <div className="p-3 rounded-2xl bg-slate-900/40 border border-slate-700/40 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Humidity</span>
                <span className="text-base font-bold text-slate-200 mt-0.5">
                  {weather.main.humidity}%
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-900/40 border border-slate-700/40 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Wind Speed</span>
                <span className="text-base font-bold text-slate-200 mt-0.5">
                  {weather.wind.speed} m/s
                </span>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
    </>
  )
};
export default WeatherComponantes;
