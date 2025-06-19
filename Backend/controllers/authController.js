const User = require("../models/user");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcrypt");

exports.signUp = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    // Validate required fields
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Full name, email, and password are required"
      });
    }

    // Only allow customer role for registration
    if (role !== 'customer') {
      return res.status(400).json({
        success: false,
        message: "Only customer registration is allowed"
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists"
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address"
      });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long"
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const user = await User.create({
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: 'customer', // Fixed role
      isActive: true,
      createdAt: new Date()
    });

    // Create customer profile if needed (optional)
    // const customer = await Customer.create({
    //   user_id: user._id,
    //   wallet_balance: 0,
    //   total_pets: 0
    // });

    return res.status(201).json({
      success: true,
      message: "Customer account created successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.log("Error in register controller:", error.message);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already exists"
      });
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: errors
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email,password)
    const user = await User.findOne({ email });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || "" 
    );

    if (!user || !isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = generateToken(user?.email);

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
	  token
    });

  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({success:false, message: "Internal Server Error" });
  }
};
