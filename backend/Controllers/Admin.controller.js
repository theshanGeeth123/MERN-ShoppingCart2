import Admin from "../Models/Admin.model.js";

export const adminRegister = async (req, res) => {
  try {
    const { admin_id, fullName, email, role, phoneNumber, password } = req.body;

    if (!admin_id || !fullName || !email || !role || !phoneNumber || !password) {
      return res.status(400).json({ success: false, message: "Please fill all fields" });
    }

    // Check if admin already exists by email or admin_id
    const existingAdmin = await Admin.findOne({ $or: [{ email }, { admin_id }] });
    if (existingAdmin) {
      return res.status(400).json({ success: false, message: "Admin with given email or admin_id already exists" });
    }

    const newAdmin = new Admin({
      admin_id,
      fullName,
      email,
      role,
      phoneNumber,
      password  // store as plain text
    });

    await newAdmin.save();

    res.status(201).json({
      success: true,
      data: {
        admin_id,
        fullName,
        email,
        role,
        phoneNumber,
        password
      }
    });
  } catch (error) {
    console.error("Error in adminRegister:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Login Admin without password hashing
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please fill all fields" });
    }

    // Find admin by email and password (plain text)
    const admin = await Admin.findOne({ email, password });
    if (!admin) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    res.status(200).json({
      success: true,
      data: {
        admin_id: admin.admin_id,
        fullName: admin.fullName,
        email: admin.email,
        role: admin.role,
        phoneNumber: admin.phoneNumber,
        id: admin._id,
      }
    });
  } catch (error) {
    console.error("Error in loginAdmin:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
