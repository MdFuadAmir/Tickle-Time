import Timer from "./Timer/Timer";

const App = () => {
  return (
    <div className="bg-black min-h-screen ">
       {/* 🌌 Animated Background */}
      <div className="absolute inset-0 bg-linear-to-br from-gray-700 via-gray-800 to-gray-900 animate-pulse" />
      <div className="absolute inset-0 backdrop-blur-2xl bg-black/40" />
      <Timer />
      <p className="text-white text-center p-4 text-lg relative">
        Copyright © {new Date().getFullYear()} - Md Fuad Amir All right reserved
      </p>
    </div>
  );
};

export default App;
