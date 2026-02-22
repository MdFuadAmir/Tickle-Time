import Timer from "./Timer/Timer";

const App = () => {
  return (
    <div className="bg-[#09637E] min-h-screen ">
       {/* 🌌 Animated Background */}
      <div className="absolute inset-0 bg-[#09637E]" />
      <div className="absolute inset-0 backdrop-blur-2xl bg-black/30" />
      <Timer />
      <p className="text-white text-center p-4 text-lg relative">
        Copyright © {new Date().getFullYear()} - Md Fuad Amir All right reserved
      </p>
    </div>
  );
};

export default App;
