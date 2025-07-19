import React,{useState,useEffect} from 'react'
import { useNavigate, Link } from "react-router-dom";
import { Sparkle, Star, SunMoon, ArrowBigLeft } from "lucide-react";
import { auth, provider, signInWithPopup } from "../config/Firebase";
import axios from "axios"

const IntroductionPage = () => {
const [userName, setUserName] = useState("");

  const navigate = useNavigate(); 

 const handleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const name = user.displayName;

    setUserName(name);

    // 🔥 Call backend to create/get user
    const res = await axios.post("http://localhost:5000/api/users", { name }); // Adjust baseURL if deploying

    console.log("User saved or fetched from DB:", res.data);

    // Optionally store user id in localStorage
    localStorage.setItem("astroUser", JSON.stringify(res.data));

    // Navigate to home with user data
    navigate("/home", { state: { user: res.data } });

  } catch (error) {
    console.error("Login error:", error);
  }
};




 return (
   <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950 text-white px-4 sm:px-8 py-10 flex flex-col items-center relative overflow-hidden">
      {/* Background Sparkles */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random(),
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="w-full max-w-5xl mx-auto mb-12 flex justify-between items-center relative z-10">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Sparkle size={28} className="text-purple-400 animate-pulse " />
          AstroGaze
        </h1>
        <Link to="/">
          <button className="flex items-center cursor-pointer bg-purple-600 px-6 py-2 rounded-full font-medium hover:bg-purple-500 transition">
            <ArrowBigLeft/>
             Go Back
          </button>
        </Link>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl text-center relative z-10">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent animate-fadeIn">
          🌠 Horoscopes: A Fun Cosmic Guide ✨
        </h2>
        <p className="text-lg mb-12 opacity-90 leading-relaxed animate-fadeIn delay-500">
          Welcome to the magical world of horoscopes! Dive in and discover some cosmic fun facts.
        </p>

        <div className="space-y-8 text-left">
          {[
            {
              icon: <Star size={28} className="text-yellow-400 inline animate-pulse" />,
              title: "What is a horoscope?",
              desc: "It's a cosmic snapshot of where the sun, moon, and planets were at your birth – your personal celestial fingerprint.",
            },
            {
              icon: <SunMoon size={28} className="text-purple-300 inline animate-spinSlow" />,
              title: "Why read horoscopes?",
              desc: "For fun, guidance, self-reflection, or to blame Mercury retrograde for tech fails and ex-texting! 🤭",
            },
            {
              icon: <Sparkle size={28} className="text-pink-400 inline animate-pulse" />,
              title: "Fun fact!",
              desc: "Each sign has a ruling planet. Taurus is ruled by Venus (love & beauty), while Scorpio is ruled by Pluto (transformation).",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:bg-white/20 transition transform hover:scale-105 animate-slideUp"
            >
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                {item.icon}
                {item.title}
              </h3>
              <p className="text-base opacity-90">{item.desc}</p>
            </div>
          ))}

          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:bg-white/20 transition transform hover:scale-105 animate-slideUp delay-500">
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              🗓️ Zodiac Dates
            </h3>
            <p className="text-base opacity-90 leading-relaxed">
              <strong>Aries:</strong> Mar 21 - Apr 19 <br />
              <strong>Taurus:</strong> Apr 20 - May 20 <br />
              <strong>Gemini:</strong> May 21 - Jun 20 <br />
              <strong>Cancer:</strong> Jun 21 - Jul 22 <br />
              <strong>Leo:</strong> Jul 23 - Aug 22 <br />
              <strong>Virgo:</strong> Aug 23 - Sep 22 <br />
              <strong>Libra:</strong> Sep 23 - Oct 22 <br />
              <strong>Scorpio:</strong> Oct 23 - Nov 21 <br />
              <strong>Sagittarius:</strong> Nov 22 - Dec 21 <br />
              <strong>Capricorn:</strong> Dec 22 - Jan 19 <br />
              <strong>Aquarius:</strong> Jan 20 - Feb 18 <br />
              <strong>Pisces:</strong> Feb 19 - Mar 20
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12">
          {/* <Link to="/home">
            
          </Link> */}

          <button 
            onClick={handleLogin}
            className=" cursor-pointer bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-4 rounded-full font-semibold hover:scale-105 transition shadow-xl animate-bounce">
              {/* Start Reading Your Horoscope */}
              Login with Gmail
            </button>
        </div>
      </main>
    </div>
  );
}

export default IntroductionPage
