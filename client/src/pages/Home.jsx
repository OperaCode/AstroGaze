import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link,useLocation } from "react-router-dom";
import {
  Sparkle,
  Star,
  SunMoon,
  Users,
  Share2,
  Save,
  Moon,
  Sun,
} from "lucide-react";

const Home = () => {
  const location = useLocation();
  const userName = location.state?.userName || "Guest";
  const [apod, setApod] = useState(null);
  const [sign, setSign] = useState("Leo");
  const [horoscope, setHoroscope] = useState(null);
  const [loadingApod, setLoadingApod] = useState(true);
  const [loadingHoroscope, setLoadingHoroscope] = useState(true);
  const [progress, setProgress] = useState(0);
  const [saved, setSaved] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showApodModal, setShowApodModal] = useState(false);

  // Zodiac signs with date ranges and icons
  const zodiacSigns = [
    {
      name: "Aries",
      range: "Mar 21 - Apr 19",
      icon: <Star size={20} className="text-violet-400" />,
    },
    {
      name: "Taurus",
      range: "Apr 20 - May 20",
      icon: <Star size={20} className="text-violet-400" />,
    },
    {
      name: "Gemini",
      range: "May 21 - Jun 20",
      icon: <Star size={20} className="text-violet-400" />,
    },
    {
      name: "Cancer",
      range: "Jun 21 - Jul 22",
      icon: <Star size={20} className="text-violet-400" />,
    },
    {
      name: "Leo",
      range: "Jul 23 - Aug 22",
      icon: <Sun size={20} className="text-violet-400" />,
    },
    {
      name: "Virgo",
      range: "Aug 23 - Sep 22",
      icon: <Star size={20} className="text-violet-400" />,
    },
    {
      name: "Libra",
      range: "Sep 23 - Oct 22",
      icon: <Star size={20} className="text-violet-400" />,
    },
    {
      name: "Scorpio",
      range: "Oct 23 - Nov 21",
      icon: <Star size={20} className="text-violet-400" />,
    },
    {
      name: "Sagittarius",
      range: "Nov 22 - Dec 21",
      icon: <Star size={20} className="text-violet-400" />,
    },
    {
      name: "Capricorn",
      range: "Dec 22 - Jan 19",
      icon: <Star size={20} className="text-violet-400" />,
    },
    {
      name: "Aquarius",
      range: "Jan 20 - Feb 18",
      icon: <Star size={20} className="text-violet-400" />,
    },
    {
      name: "Pisces",
      range: "Feb 19 - Mar 20",
      icon: <Star size={20} className="text-violet-400" />,
    },
  ];

  // Fetch NASA APOD
  useEffect(() => {
    const fetchAPOD = async () => {
      setLoadingApod(true);
      try {
        const res = await axios.get("/api/apod");
        setApod(res.data);
        setLoadingApod(false);
      } catch (error) {
        console.error("Failed to fetch APOD", error);
        setLoadingApod(false);
      }
    };
    fetchAPOD();
  }, []);

  // Fetch Horoscope
  const fetchHoroscope = async () => {
    setLoadingHoroscope(true);
    setProgress(0);
    try {
      const res = await axios.get(
        `/api/horoscope?sign=${sign.toLowerCase()}&day=today`
      );
      setHoroscope(res.data);
      setProgress(100);
      setLoadingHoroscope(false);
    } catch (error) {
      console.error("Failed to fetch horoscope", error);
      setLoadingHoroscope(false);
      setProgress(100);
    }
  };

  useEffect(() => {
    fetchHoroscope();
  }, [sign]);

  // Progress bar animation
  useEffect(() => {
    if (loadingHoroscope) {
      const interval = setInterval(() => {
        setProgress((prev) => (prev >= 90 ? 90 : prev + 10));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [loadingHoroscope]);

  // Scroll reveal animation
  useEffect(() => {
    const elements = document.querySelectorAll(".animate-on-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-8");
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Toggle dark/light mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Mock save horoscope
  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    console.log("Saved horoscope:", horoscope);
    // Implement localStorage or API save here
  };

  // Share on X
  const handleShare = () => {
    const text = encodeURIComponent(
      `My ${sign} horoscope today: ${horoscope?.description} #AstroGaze`
    );
    window.open(`https://x.com/intent/tweet?text=${text}`, "_blank");
  };

  return (
    <div
      className={`w-full min-h-screen flex flex-col font-sans relative overflow-hidden transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-b from-gray-900 to-indigo-900 text-white"
          : "bg-gradient-to-b from-gray-100 to-blue-200 text-gray-900"
      }`}
    >
      {/* Cosmic Background (Dark Mode Only) */}
      {/* {isDarkMode && (
          <div
            className="absolute inset-0 z-0"
            style={{
              background:
                "radial-gradient(circle at top, rgba(139, 92, 246, 0.2) 0%, transparent 50%), linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6))",
            }}
            aria-hidden="true"
          >
            <div className="absolute w-1 h-1 bg-white/70 rounded-full top-[10%] left-[20%]" />
            <div className="absolute w-2 h-2 bg-white/60 rounded-full top-[30%] left-[70%]" />
            <div className="absolute w-1.5 h-1.5 bg-white/80 rounded-full top-[50%] left-[15%]" />
            <div className="absolute w-1 h-1 bg-white/50 rounded-full top-[70%] left-[80%]" />
          </div>
        )} */}

      {/* Header */}
      <header className="w-full py-4 px-4 sm:px-6 flex justify-between items-center bg-gray-900/90 dark:bg-gray-900/90 backdrop-blur-md sticky top-0 z-20 shadow-lg">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2">
          <Sparkle
            size={24}
            className="text-violet-400 animate-pulse"
           
          />
          AstroGaze
        </h1>
        <nav
          role="navigation"
          aria-label="Main navigation"
          className="flex gap-2 sm:gap-4"
        >
          <Link to="/" >
            <button className="bg-violet-500 text-white font-medium px-4 sm:px-6 py-2 rounded-full shadow-md hover:bg-violet-400 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-violet-300">
              Landing
            </button>
          </Link>
          <Link to="/compatibility" >
            <button className="bg-white/10 text-white font-medium px-4 sm:px-6 py-2 rounded-full shadow-md hover:bg-white/20 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-violet-300">
              Compatibility
            </button>
          </Link>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition duration-300 focus:outline-none focus:ring-2 focus:ring-violet-300"
            aria-label={
              isDarkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </nav>
      </header>
       <h1 className="text-3xl font-bold p-4 justify-start  items-left ml-0">Welcome, {userName}!</h1>

      {/* <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <h1 className="text-3xl font-bold">Welcome, {userName}!</h1>
      </div> */}

      {/* Main Content */}
      <main className="flex-grow px-4 sm:px-6 py-6 sm:py-16 max-w-4xl mx-auto space-y-16 relative z-10">
         {/* <h1 className="text-3xl font-bold">Welcome, {userName}!</h1> */}
        {/* NASA APOD Section */}
          
        <section className="text-center animate-on-scroll opacity-0 translate-y-8 transition-all duration-700">
          <h2 className="text-2xl sm:text-3xl font-bold  flex items-center justify-center gap-2">
            <SunMoon size={28} className="text-violet-400"  />
            Astronomy Picture of the Day
          </h2>
          {loadingApod ? (
            <div className="max-w-md mx-auto">
              <p className="text-base opacity-80 mb-4">
                Loading cosmic image...
              </p>
              <div className="w-full bg-gray-700/50 rounded-full h-2">
                <div
                  className="bg-violet-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ) : apod ? (
            <div className="relative">
              <img
                src={apod.url}
                alt={apod.title}
                className="w-full max-w-lg mx-auto rounded-lg shadow-lg mb-4 cursor-pointer hover:opacity-90 transition"
                onClick={() => setShowApodModal(true)}
              />
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                {apod.title}
              </h3>
              <p className="text-sm sm:text-base max-w-xl mx-auto opacity-90">
                {apod.explanation}
              </p>
            </div>
          ) : (
            <p className="text-sm opacity-80">
              Unable to load Astronomy Picture. Try again later.
            </p>
          )}
        </section>

        {/* APOD Modal */}
        {showApodModal && apod && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            role="dialog"
            aria-labelledby="apod-modal-title"
          >
            <div className="bg-gray-800/90 p-6 rounded-lg max-w-3xl w-full mx-4">
              <h3
                id="apod-modal-title"
                className="text-lg sm:text-xl font-semibold mb-4"
              >
                {apod.title}
              </h3>
              <img
                src={apod.url}
                alt={apod.title}
                className="w-full rounded-lg mb-4"
              />
              <p className="text-sm sm:text-base opacity-90 mb-4">
                {apod.explanation}
              </p>
              <button
                onClick={() => setShowApodModal(false)}
                className="bg-violet-500 text-white font-medium px-4 py-2 rounded-full hover:bg-violet-400 transition focus:outline-none focus:ring-2 focus:ring-violet-300"
                aria-label="Close modal"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Horoscope Section */}
        <section className="text-center animate-on-scroll opacity-0 translate-y-8 transition-all duration-700">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center justify-center gap-2">
            <Star size={28} className="text-violet-400" aria-hidden="true" />
            Your Daily Horoscope
          </h2>
          <div className="max-w-sm mx-auto mb-8">
            <label
              htmlFor="zodiac-select"
              className="block text-sm sm:text-base font-medium mb-2"
              id="zodiac-select-label"
            >
              Choose Your Zodiac Sign
            </label>
            <div className="relative">
              <select
                id="zodiac-select"
                value={sign}
                onChange={(e) => setSign(e.target.value)}
                className="w-full p-3 pr-10 rounded-lg bg-gray-800/80 dark:bg-gray-800/80 text-white border border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-400 appearance-none"
                aria-labelledby="zodiac-select-label"
              >
                {zodiacSigns.map((s) => (
                  <option
                    key={s.name.toLowerCase()}
                    value={s.name.toLowerCase()}
                    className="bg-gray-900"
                  >
                    {s.name} ({s.range})
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                {zodiacSigns.find((s) => s.name.toLowerCase() === sign)?.icon}
              </div>
            </div>
          </div>
          {loadingHoroscope ? (
            <div className="max-w-md mx-auto">
              <p className="text-base sm:text-lg opacity-80 mb-4">
                Fetching your cosmic insights...
              </p>
              <div className="w-full bg-gray-700/50 rounded-full h-2">
                <div
                  className="bg-violet-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ) : horoscope ? (
            <div className="bg-gray-800/90 p-6 sm:p-8 rounded-xl backdrop-blur-sm shadow-xl max-w-md mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-violet-500/20 p-2 rounded-full">
                  {zodiacSigns.find((s) => s.name.toLowerCase() === sign)?.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold">
                  {horoscope.sign} - {horoscope.date}
                </h3>
              </div>
              <p className="text-base sm:text-lg italic mb-6 leading-relaxed">
                "{horoscope.description}"
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                <div>
                  <p className="font-medium text-gray-300 dark:text-gray-300">
                    Mood
                  </p>
                  <p className="text-violet-400 font-semibold">
                    {horoscope.mood}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-300 dark:text-gray-300">
                    Color
                  </p>
                  <p className="text-violet-400 font-semibold">
                    {horoscope.color}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-300 dark:text-gray-300">
                    Lucky Number
                  </p>
                  <p className="text-violet-400 font-semibold">
                    {horoscope.lucky_number}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-300 dark:text-gray-300">
                    Compatibility
                  </p>
                  <p className="text-violet-400 font-semibold">
                    {horoscope.compatibility}
                  </p>
                </div>
              </div>
              <div className="flex justify-between gap-4">
                <button
                  onClick={handleSave}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-violet-300 ${
                    saved
                      ? "bg-green-500 text-white"
                      : "bg-violet-500 text-white hover:bg-violet-400"
                  }`}
                  aria-label={saved ? "Horoscope saved" : "Save horoscope"}
                >
                  <Save size={20} />
                  {saved ? "Saved" : "Save"}
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 dark:bg-white/10 text-white font-medium hover:bg-white/20 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-violet-300"
                  aria-label="Share horoscope on X"
                >
                  <Share2 size={20} />
                  Share
                </button>
              </div>
            </div>
          ) : (
            <p className="text-sm opacity-80">
              Unable to load horoscope. Try again later.
            </p>
          )}
        </section>

        {/* Star Map Section */}
        <section className="text-center animate-on-scroll opacity-0 translate-y-8 transition-all duration-700">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center justify-center gap-2">
            <Users size={28} className="text-violet-400" aria-hidden="true" />
            Star Map Preview
          </h2>
          <div className="bg-gray-800/90 p-6 rounded-xl backdrop-blur-sm shadow-xl max-w-lg mx-auto">
            <div className="relative w-full h-48 bg-gray-900 rounded-lg overflow-hidden mb-4">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
                }}
              >
                <div className="absolute w-1 h-1 bg-white/80 rounded-full top-[20%] left-[30%]" />
                <div className="absolute w-2 h-2 bg-white/70 rounded-full top-[40%] left-[60%]" />
                <div className="absolute w-1.5 h-1.5 bg-white/90 rounded-full top-[60%] left-[20%]" />
              </div>
              <p className="absolute bottom-4 left-4 text-sm opacity-80">
                Coming soon: Interactive star map
              </p>
            </div>
            <p className="text-sm opacity-80">
              Explore real-time celestial events and constellations in your
              location!
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 px-4 sm:px-6 text-center bg-gray-900/90 dark:bg-gray-900/90 backdrop-blur-sm relative z-10">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm opacity-80 mb-4">
            © 2025 AstroGaze. All rights reserved.
          </p>
          <div className="flex justify-center gap-4 sm:gap-6">
            <a
              href="https://x.com"
              aria-label="Follow AstroGaze on X"
              className="text-violet-400 hover:text-violet-300 transition duration-200 focus:outline-none focus:ring-2 focus:ring-violet-300"
            >
              X
            </a>
            <a
              href="https://instagram.com"
              aria-label="Follow AstroGaze on Instagram"
              className="text-violet-400 hover:text-violet-300 transition duration-200 focus:outline-none focus:ring-2 focus:ring-violet-300"
            >
              Instagram
            </a>
            <a
              href="/privacy"
              aria-label="Privacy Policy"
              className="text-violet-400 hover:text-violet-300 transition duration-200 focus:outline-none focus:ring-2 focus:ring-violet-300"
            >
              Privacy
            </a>
          </div>
        </div>
      </footer>

      {/* Styles */}
      <style>{`
          .hover\\:shadow-glow:hover {
            box-shadow: 0 0 12px rgba(255, 255, 255, 0.4);
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(16px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.8s ease-out forwards;
          }
          @keyframes pulseSlow {
            0%, 100% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.05); opacity: 1; }
          }
          .animate-pulse-slow {
            animation: pulseSlow 3s ease-in-out infinite;
          }
        `}</style>
    </div>
  );
};

export default Home;
