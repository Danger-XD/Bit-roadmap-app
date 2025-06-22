import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utilities/tokenGen.utility.js";

export const signup = async (req, res) => {
  try {
    // get value from body
    const { username, email, password } = req.body;
    // check if body is empty
    if (!username || !email || !password) {
      return res.status(400).json({
        status: "failed",
        message: "Signup: Can't leave value empty!",
      });
    }
    // check password length
    if (password.length < 4) {
      return res.status(400).json({
        status: "failed",
        message: "Signup: Minimum password length is 4!",
      });
    }
    // check if email already exist
    const emailCheck = await userModel.findOne({ email }).select("-password");
    if (emailCheck) {
      return res
        .status(400)
        .json({ status: "failed", message: "Signup: Email already exist" });
    }
    // hash password
    const saltRounds = parseInt(process.env.SERVER_SALT_ROUND);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // create profile in DB
    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });
    // check if profile created
    if (!newUser) {
      return res.status(400).json({
        status: "failed",
        message: "Signup: Something wrong with server!",
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Signup: Profile created successfully!",
      user: {
        id: newUser._id,
        email: newUser.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    // check fields
    const { email, password } = req.body;
    // check if body is empty
    if (!email || !password) {
      return res.status(400).json({
        status: "failed",
        message: "Login: Can't leave value empty!",
      });
    }
    // check user exist or not
    const profileCheck = await userModel.findOne({ email });
    if (!profileCheck) {
      return res
        .status(400)
        .json({ status: "failed", message: "Login: No user found!" });
    }
    // check password
    const passwordCheck = await bcrypt.compare(password, profileCheck.password);
    if (!passwordCheck) {
      return res
        .status(400)
        .json({ status: "failed", message: "Login: Password incorrect!" });
    }
    // generate token
    const token = generateToken(profileCheck._id, profileCheck.email);
    if (!token) {
      return res.status(400).json({
        status: "failed",
        message: "Login: Something wrong with token!",
      });
    }
    const options = {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: process.env.SERVER_TOKEN_HTTP,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    };
    // return and set token to cookie
    return res
      .status(200)
      .cookie("token", token, options)
      .json({ status: "success", message: "Login: Login successful!", token });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    const options = {
      maxAge: 0,
      httpOnly: process.env.SERVER_TOKEN_HTTP,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    };
    return res
      .status(200)
      .cookie("token", "", options)
      .json({ status: "success", message: "Logout: Logout successful!" });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
};
