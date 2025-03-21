const Attendance = require("../models/attendance");

exports.getAttendanceList = async (req, res) => {
  try {
    const user = req.user;

    const { date } = req.params;
    const queryDate = new Date(date);
    console.log(date);

    const attendance = await Attendance.findOne({
      date: queryDate,
    }).populate({
      path: "List",
      populate: {
        path: "petId",
        populate: {
          path: "owner",
          select: "name phone email",
        },
      },
    });

    if (attendance) {
      return res.status(200).json({
        success: true,
        message: "List fetched successfully",
        attendance,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Invalid data",
      });
    }
  } catch (error) {
    console.log("Error in getAttendance controller", error);
    return res.status(500).json({
      success: "false",
      message: "Internal Server Error",
    });
  }
};

exports.updateAttendanceList = async (req, res) => {
  try {
    const { date, list } = req.body;
    
  
    if (!list || !date ||list.length===0) {
      return res.status(400).json({
        success: "false",
        message: "Can't update attendance",
      });
    }

    const newList = list.map((item, idx) => {
      return {
        petId: item?.petId?._id,
        purpose: item?.purpose,
        present: item?.present,
      };
    });

    const queryDate = new Date(date);

    const attendance = await Attendance.findOneAndUpdate(
      {
        date: queryDate,
      },
      {
        List: newList,
      },
      { returnDocument: "after" }
    ).populate({
      path: "List",
      populate: {
        path: "petId",
        populate: {
          path: "owner",
          select: "name phone email",
        },
      },
    });;

    return res.status(200).json({
      success: true,
      message: "Attendance updated successfully",
      attendance,
    });
  } catch (error) {
    console.log("Error in getAttendance controller", error);
    return res.status(500).json({
      success: "false",
      message: "Internal Server Error",
    });
  }
};
