import Customer from "../Models/Customer.model.js";

export const registerUser = async (req, res) => {
  const { firstName, lastName, email, age, phone, password } = req.body;

  if (!firstName || !lastName || !email || age === undefined || !phone || !password) {
    return res.status(400).json({ success: false, message: "Please fill all fields" });
  }

  try {
    const existingUser = await Customer.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    const newUser = new Customer({ firstName, lastName, email, age, phone, password });
    await newUser.save();

    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    console.log("Error in registerUser:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



export const loginUser = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Please enter email and password" });
    }

    try {
        const user = await Customer.findOne({ email });

        if (!user || user.password !== password) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.log("Error in loginUser:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


export const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await Customer.findById(id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.log("Error in getUserById:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


export const getAllUsers = async (req, res) => {
    try {
        const users = await Customer.find();
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.log("Error in getAllUsers:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


// Example: /api/customers/search?firstName=John
export const getAllUsersByFilter = async (req, res) => {
    try {
        const filter = req.query; // e.g., { firstName: "John" }

        const users = await Customer.find(filter);

        if (users.length === 0) {
            return res.status(404).json({ success: false, message: "No users found with given filters" });
        }

        res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.log("Error in getAllUsersByFilter:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


export const deleteUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await Customer.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, message: "User deleted successfully", data: deletedUser });
  } catch (error) {
    console.error("Error in deleteUserById:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};