// const getHoroscope = require("../utils/horoscope");

// const fetchUserHoroscope = async (req, res) => {
//   try {
//     const user = await User.findById(req.userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const horoscope = await getHoroscope(user.zodiacSign);
//     res.json({ sign: user.zodiacSign, horoscope });
//   } catch (error) {
//     console.error("Horoscope fetch error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// module.exports = { fetchUserHoroscope };
