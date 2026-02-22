import {
  FaPlay,
  FaPause,
  FaRedo,
  FaHourglassHalf,
  FaStopwatch,
} from "react-icons/fa";
import logo from "../assets/time.png";
import { useEffect, useRef, useState } from "react";
import audio from "../assets/mixkit-arcade-retro-game-over-213.wav";


const Timer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const [input, setInput] = useState({ h: 0, m: 0, s: 0 });

  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  const isCountdown = input.h || input.m || input.s;

  useEffect(() => {
    if (!isRunning) {
      return;
    }
    intervalRef.current = setInterval(() => {
      setTime((prev) => {
        if (isCountdown) {
          if (prev <= 10) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            audioRef.current.play();
            return 0;
          }
          return prev - 10;
        }
        return prev + 10;
      });
    }, 10);
    return () => clearInterval(intervalRef.current);
  }, [isRunning, isCountdown]);

  const handleSetTime = () => {
    const totalMs = input.h * 3600000 + input.m * 60000 + input.s * 1000;
    if (totalMs <= 0) return;
    setTime(totalMs);
  };

  const formatTime = () => {
    const ms = Math.floor((time % 1000) / 10);
    const totalSeconds = Math.floor(time / 1000);

    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}.${ms
      .toString()
      .padStart(2, "0")}`;
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setInput({ h: 0, m: 0, s: 0 });
  };
  return (
    <div className="min-h-screen flex justify-center items-center  relative p-4">
      <div className="bg-[#7AB2B2]/10 max-w-md w-full shadow-2xl  rounded-2xl px-4 md:px-6 py-4">
        <img
          src={logo}
          alt=""
          className="w-32 h-32 mx-auto rounded-full mb-3 animate-bounce [animation-duration:3s]"
        />
        <h1 className="text-center text-[#EBF4F6] front-bold text-3xl md:text-4xl mb-6">
          Smart Tickle Timer
        </h1>
        <div>
          {/* time setting */}
          <div className="flex gap-2 justify-center text-[#EBF4F6] mb-4">
            <input
              type="number"
              placeholder="HH"
               value={input.h}
              onChange={(e) => setInput({ ...input, h: +e.target.value })}
              className="w-16 px-2 py-1 rounded border border-white/50"
            />
            <input
              type="number"
              placeholder="MM"
               value={input.m}
              onChange={(e) => setInput({ ...input, m: +e.target.value })}
              className="w-16 px-2 py-1 rounded border border-white/50"
            />
            <input
              type="number"
              placeholder="SS"
               value={input.s}
              onChange={(e) => setInput({ ...input, s: +e.target.value })}
              className="w-16 px-2 py-1 rounded border border-white/50"
            />
            <button
              onClick={handleSetTime}
              className="px-3 py-1 bg-sky-500 rounded"
            >
              Set Time
            </button>
          </div>
          {/* display timer */}
          <div className="text-4xl font-bold text-center my-12 tracking-widest font-mono text-white">
            {formatTime()}
          </div>
          {/* controler */}
          <div className="flex justify-center gap-6">
            {!isRunning ? (
              <button
                onClick={() => setIsRunning(true)}
                className="p-4 rounded-full bg-green-500 hover:bg-green-600"
              >
                <FaPlay />
              </button>
            ) : (
              <button
                onClick={() => setIsRunning(false)}
                className="p-4 rounded-full bg-yellow-500 hover:bg-yellow-600"
              >
                <FaPause />
              </button>
            )}
            {/* reset btn */}
            <button
              onClick={handleReset}
              className="p-4 rounded-full bg-red-500 hover:bg-red-600"
            >
              <FaRedo />
            </button>
          </div>
          {/* mode */}
          <p className="mt-4 text-xl opacity-70 text-center flex gap-2 justify-center text-white">
            Mode:{" "}
            {isCountdown ? (
              <p className="flex items-center gap-2">
                Countdown
                <FaHourglassHalf className=" animate-spin [animation-duration:3s]"/>
              </p>
            ) : (
              <p className="flex items-center gap-2">
                Stopwatch
                <FaStopwatch className="animate-pulse [animation-duration:2s]"/>
              </p>
            )}
          </p>
          <audio ref={audioRef} src={audio} />
        </div>
      </div>
    </div>
  );
};

export default Timer;


