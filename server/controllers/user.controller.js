const { StatusCodes } = require("http-status-codes");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

const userCtrl = {
  register: async (req, res) => {
    try {
      const data = req.body.userData;
      const newData = JSON.parse(data);
      const { username, email, password } = newData;
      const file = req.file;
      if (!username || !email || !password) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: "Missing fields" });
      } else {
        const findUser = await User.findOne({ email: email });
        if (findUser) {
          return res
            .status(StatusCodes.CONFLICT)
            .json({ msg: "Email already exist!" });
        } else if (password.length < 6) {
          return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ msg: "Password must be 6 characters long!" });
        } else {
          const hashedPassword = await bcrypt.hash(password, 12);
          const newUser = new User({
            username,
            email,
            password: hashedPassword,
            dp: "http://localhost:5000/" + file.path,
          });
          await newUser.save();
          return res
            .status(StatusCodes.OK)
            .json({ msg: "User registered successfully" });
        }
      }
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: "Missing fields" });
      } else {
        const findUser = await User.findOne({ email: email });
        if (findUser) {
          const isMatch = await bcrypt.compare(password, findUser.password);

          if (isMatch) {
            const token = await generateToken(findUser.id);
            return res
              .status(StatusCodes.OK)
              .json({ msg: "Login successfully", token: token });
          } else {
            return res
              .status(StatusCodes.BAD_REQUEST)
              .json({ msg: "Invalid Credentials" });
          }
        } else {
          return res
            .status(StatusCodes.NOT_FOUND)
            .json({ msg: "This email is not registered!" });
        }
      }
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
    }
  },
  getProfile: async (req, res) => {
    try {
      const id = req.user;
      const user = await User.findById(id).select("-password");
      return res.status(StatusCodes.OK).json(user);
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
    }
  },
  updateProfile: async (req, res) => {
    try {
      const id = req.user;
      const { username } = req.body;
      await User.findByIdAndUpdate(id, { username: username });
      return res
        .status(StatusCodes.OK)
        .json({ msg: "User update successfully" });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const findUsers = await User.find().select("-password");
      if (findUsers.length !== 0) {
        return res.status(StatusCodes.OK).json(findUsers);
      } else {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ msg: "No Users found!" });
      }
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
    }
  },
  getUserById: async (req, res) => {
    try {
      const id = req.params.userId;
      const findUser = await User.findById(id).select("-password");
      if (findUser) {
        return res.status(StatusCodes.OK).json(findUser);
      } else {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ msg: "No user found!" });
      }
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
    }
  },
};

module.exports = userCtrl;
