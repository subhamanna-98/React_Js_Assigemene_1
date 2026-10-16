import axios from "axios";
import { useEffect, useState } from "react"
interface Joke {
    "type": string;
  "setup": string;
  "punchline": string
  "id": number
}

 const JokeGenerator = () => {
    const [error,setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [joke, setJoke] = useState<Joke | null>(null);
    const [showPunchline, setShowPunchline] = useState<boolean>(false);
    const JokeFetchDate = async() => {

        setLoading(true)
        setError("");
    setShowPunchline(false);
        try {
            const respone = await axios.get<Joke>("https://official-joke-api.appspot.com/random_joke")
            setJoke(respone?.data)
        } catch (error: any) {
            setError(error.message || "Failed to fetch a joke. Try again!")
        }finally{
            setLoading(false)
        }
    }
    useEffect(()=> {
        JokeFetchDate()
    },[])


  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans text-slate-800">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-sm border border-slate-200 p-8 space-y-6 text-center">
        
        {/* হেডার */}
        <div className="space-y-1">
          <span className="text-xs font-bold tracking-widest text-amber-600 uppercase bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
            Daily Laughs
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-2">
            Random Joke Generator
          </h1>
          <p className="text-xs text-slate-500">
            Click the button below to get a fresh joke on demand.
          </p>
        </div>

        {/* এরর স্টেট */}
        {error && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-xs font-semibold text-rose-600">
            {error}
          </div>
        )}

        {/* জোক ডিসপ্লে বক্স */}
        <div className="min-h-[160px] bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col justify-center items-center space-y-4">
          {loading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-7 h-7 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs text-slate-400 font-medium">Finding a funny one...</span>
            </div>
          ) : joke ? (
            <div className="space-y-4">
              {/* সেটআপ / প্রশ্ন */}
              <p className="text-base sm:text-lg font-semibold text-slate-800 leading-relaxed">
                "{joke.setup}"
              </p>

              {/* পাঞ্চলাইন রিভিল এরিয়া */}
              {showPunchline ? (
                <p className="text-sm sm:text-base font-bold text-amber-600 animate-bounce">
                  👉 {joke.punchline}
                </p>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowPunchline(true)}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold underline underline-offset-4 cursor-pointer"
                >
                  Show Punchline 🤔
                </button>
              )}
            </div>
          ) : null}
        </div>

        {/* নতুন জোক আনার বাটন (Re-fetch Button) */}
        <div>
          <button
            type="button"
            onClick={JokeFetchDate}
            disabled={loading}
            className={`w-full py-3 px-6 rounded-xl text-sm font-semibold text-white shadow-sm transition-all cursor-pointer ${
              loading
                ? "bg-slate-300 cursor-not-allowed"
                : "bg-amber-500 hover:bg-amber-600 active:scale-98 shadow-amber-200"
            }`}
          >
            {loading ? "Loading Joke..." : "Get Another Joke 😂"}
          </button>
        </div>

      </div>
    </div>
  )
}
export default JokeGenerator
