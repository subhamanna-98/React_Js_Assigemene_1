import { useEffect, useState } from "react"


 const STOPEWATCH = () => {
    const [time, setTime] = useState<number>(0)
    const [isRunning, setIsRunning] = useState<boolean>(false)
    // time-effect
    useEffect(() => {
    // let intervalId: Nodejs.Timeout | number;
    let intervalId: ReturnType<typeof setInterval> | undefined;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRunning]);
    // toggle-pause
    const toggleStartPause = () => {
        setIsRunning((prev) => !prev)
    }
    // reset
    const handleReset = () => {
        setIsRunning(false)
        setTime(0)
    }

    // mini-sec
    const formatTime = (totalSecond:number) => {
        const mins = Math.floor(totalSecond/60)
        const sec = totalSecond % 60
        return `${String(mins).padStart(2,"0")}: ${String(sec).padStart(2,"0")}`
    }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-sm border border-slate-200 p-8 text-center space-y-6">
        
        {/* HEADER */}
        <div>
          <h1 className="text-xl font-bold text-slate-800">Stopwatch</h1>
          <p className="text-xs text-slate-500 mt-1">Real-time interval & state tracker</p>
        </div>

        {/*  */}
        <div className="py-6 px-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-center items-center">
          <span className="font-mono text-5xl font-extrabold text-slate-800 tracking-wider">
            {formatTime(time)}
          </span>
        </div>

        {/*  */}
        <div className="flex gap-3 justify-center">
          {/* Start / Pause  */}
          <button
            type="button"
            onClick={toggleStartPause}
            className={`flex-1 py-3 px-5 rounded-xl text-sm font-semibold text-white shadow-sm transition-all cursor-pointer ${
              isRunning
                ? "bg-amber-500 hover:bg-amber-600 active:scale-95"
                : "bg-indigo-600 hover:bg-indigo-700 active:scale-95"
            }`}
          >
            {isRunning ? "Pause" : "Start"}
          </button>

          {/* Reset  */}
          <button
            type="button"
            onClick={handleReset}
            disabled={time === 0}
            className={`py-3 px-5 rounded-xl text-sm font-semibold border transition-all cursor-pointer ${
              time === 0
                ? "border-slate-200 text-slate-300 cursor-not-allowed bg-slate-50"
                : "border-slate-300 text-slate-700 hover:bg-slate-50 active:scale-95"
            }`}
          >
            Reset
          </button>
        </div>

      </div>
    </div>
  )
}

export default STOPEWATCH
