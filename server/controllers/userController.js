import User from "../models/User.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // hide password field
    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const loggedInUserId = req.user.id;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (user._id.toString() === loggedInUserId.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot delete your own account",
      });
    }
    await User.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export { getAllUsers, deleteUser };
