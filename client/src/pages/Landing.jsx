import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sparkle, Star, SunMoon, Users, Quote } from "lucide-react";

const Landing = () => {
  const [isVisible, setIsVisible] = useState({
    features: false,
    testimonials: false,
  });

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setIsVisible((prev) => ({ ...prev, features: true }));
    }, 500);
    const timer2 = setTimeout(() => {
      setIsVisible((prev) => ({ ...prev, testimonials: true }));
    }, 1000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950 text-white overflow-hidden relative">
      {/* Cosmic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/30 via-indigo-950/30 to-transparent animate-gradientShift bg-[length:200%_200%] z-0">
        {/* Twinkling stars */}
        {[
          { top: "10%", left: "20%", size: "w-2 h-2", delay: "" },
          { top: "30%", left: "70%", size: "w-1.5 h-1.5", delay: "delay-1000" },
          { top: "50%", left: "10%", size: "w-1 h-1", delay: "delay-2000" },
          { top: "70%", left: "80%", size: "w-2.5 h-2.5", delay: "delay-500" },
        ].map((star, i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-white/70 ${star.size} top-[${star.top}] left-[${star.left}] animate-twinkle ${star.delay}`}
          />
        ))}
      </div>

      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-gray-900/90 backdrop-blur-lg sticky top-0 z-10 shadow-lg">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Sparkle size={24} className="text-purple-400 animate-pulse" />
          AstroGaze
        </h1>
        <Link to="/home">
          <button className="bg-purple-600 cursor-pointer  px-5 py-2 rounded-full font-medium hover:bg-purple-500 transition">
            Get Started
          </button>
        </Link>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center flex-grow text-center px-4 pt-16 pb-12 relative z-10">
        <div className="max-w-4xl">
          {/* Hero Icon */}
          <div className="relative w-72 h-72 mx-auto mb-10">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600/40 to-indigo-600/40 animate-pulse" />
            <div className="absolute inset-8 rounded-full bg-gradient-to-br from-purple-500/30 to-indigo-500/30 opacity-60 animate-pulseSlow" />
            <SunMoon
              size={100}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spinSlow text-purple-300"
            />
            <Star
              size={40}
              className="absolute top-10 left-10 text-yellow-300 animate-twinkle"
            />
            <Sparkle
              size={30}
              className="absolute bottom-12 right-12 text-indigo-300 animate-twinkle delay-500"
            />
          </div>



            


          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent mb-6">
            Embark on a Cosmic Journey
          </h1>

          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Dive into personalized horoscopes, zodiac compatibility, and
            celestial insights to illuminate your path.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/about">
              <button className=" cursor-pointer bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-3 rounded-full font-semibold hover:scale-105 transition flex items-center gap-2">
                <Star size={20} className="animate-pulse" />
                Explore Horoscope
              </button>
            </Link>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section
        className={`px-4 py-16 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 transition duration-700 ${
          isVisible.features
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        {[
          {
            icon: (
              <Star
                size={36}
                className="mx-auto mb-4 text-purple-400 animate-pulse"
              />
            ),
            title: "Daily Horoscope",
            desc: "Personalized insights for your zodiac sign updated daily.",
          },
          {
            icon: (
              <Users
                size={36}
                className="mx-auto mb-4 text-purple-400 animate-pulse"
              />
            ),
            title: "Compatibility",
            desc: "Discover meaningful connections with friends and partners.",
          },
          {
            icon: (
              <Sparkle
                size={36}
                className="mx-auto mb-4 text-purple-400 animate-pulse"
              />
            ),
            title: "Lucky Insights",
            desc: "Uncover your daily lucky numbers and cosmic tips.",
          },
        ].map((feature, i) => (
          <div
            key={i}
            className="bg-white/10 p-6 rounded-xl text-center backdrop-blur-lg hover:bg-white/20 transition shadow-md"
          >
            {feature.icon}
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm opacity-90">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* Testimonials */}
      <section
        className={`px-4 py-16 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 transition duration-700 ${
          isVisible.testimonials
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        {[
          {
            quote: "AstroGaze guides my day with cosmic wisdom!",
            name: "Maya, Libra",
          },
          {
            quote: "Compatibility insights are spot-on and fun!",
            name: "Noah, Virgo",
          },
        ].map((testimonial, i) => (
          <div
            key={i}
            className="bg-white/10 p-6 rounded-xl text-center backdrop-blur-lg shadow-md"
          >
            <Quote
              size={24}
              className="mx-auto mb-4 text-purple-400 animate-pulse"
            />
            <p className="italic mb-2">"{testimonial.quote}"</p>
            <p className="font-semibold">{testimonial.name}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="py-6 bg-gray-900/90 backdrop-blur-lg text-center">
        <p className="text-sm opacity-80 mb-2">
          © 2025 AstroGaze. All rights reserved.
        </p>
        <div className="flex justify-center gap-4">
          {["X", "Instagram", "Privacy"].map((link, i) => (
            <a
              key={i}
              href="/"
              className="text-purple-400 hover:text-purple-300 transition"
            >
              {link}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default Landing;
