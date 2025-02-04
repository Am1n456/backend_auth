import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokens } from "../utils/token.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      res.status(400).json({ message: "All Fields Are Required" });
    }

    const user = await User.findOne({ email });

    if (user) {
      res.status(400).json({ message: "email already exists" });
    }

    if (password.length <= 6) {
      res.status(400, {
        message: "Password Should Minimum be of 6 Characters",
      });
    }

    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateTokens(newUser._id, res);
      await newUser.save();

      res.status(200).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
      });
    } else {
      res.status(400).json({ message: "Invalid User Data:: " });
    }
  } catch (error) {
    console.log("Error in signup Controller: ", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User with this email doesn't exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Assume generateTokens will send a response if needed or just modify tokens in the header
    generateTokens(user._id, res);

    // Successfully logged in
    return res.status(200).json({
      message: "User Logged in successfully",
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    });

  } catch (error) {
    console.log("Error in Login Controller: ", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = async(req, res) => {
  try {
    res.cookie("jwt", "", {maxAge: 0})
    res.status(200).json({message: "User Logged Out SuccessFully"})
  } catch (error) {
    console.log(`error occurred in logout controller: ${error.message}`)
    res.status(400).json({message: "Internal Server Error"})
  }
}