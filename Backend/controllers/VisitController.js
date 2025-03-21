const express = require("express");
const mongoose = require("mongoose");

const Pet = require("../models/pet");
const Visit = require("../models/Visit");
const Inventory = require("../models/inventory");
const Attendance = require("../models/attendance");

exports.addVisit = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { petId, visitForm, totalPrice } = req.body;
    const {
      purpose,
      itemDetails,
      nextFollowUp,
      followUpTime,
      followUpPurpose,
      customerType,
    } = visitForm;

    if (!mongoose.Types.ObjectId.isValid(petId)) {
      throw new Error("Invalid pet ID");
    }

    // Validate each item in itemDetails
    for (const itemDetail of itemDetails) {
      const { item, dose, volumeML } = itemDetail;

      const inventoryItem = await Inventory.findById(item);
      if (!inventoryItem) {
        throw new Error(`Inventory item with ID ${item} not found`);
      }

      if (inventoryItem.totalVolume < volumeML) {
        throw new Error(
          `Insufficient volume for item ${inventoryItem.itemName}`
        );
      }

      // Update inventory
      const stockused = volumeML / inventoryItem.volumeML;

      inventoryItem.stockUnit -= stockused;

      if (inventoryItem.totalVolume) {
        inventoryItem.totalVolume -= volumeML;
      }

      await inventoryItem.save({ session });

      const petobtain = await Pet.findById(petId).session(session);
      if (!petobtain) throw new Error("Pet not found");

      const it={};
      
      it["name"]=inventoryItem.itemName;
      it["numberOfDose"]=dose;
     
      const existingVaccination = petobtain.vaccinations.find(
        (vac) => vac.name === inventoryItem.itemName
      );
      
      if (existingVaccination) {
        
        existingVaccination.numberOfDose = dose;
      } else {
        
        petobtain.vaccinations.push(it);
      }

      await petobtain.save({ session });


    }
    // Create a new visit record
    const visit = new Visit({
      pet: petId,
      purpose,
      itemDetails,
      nextFollowUp: new Date(`${nextFollowUp}T${followUpTime}`),
      followUpPurpose,
      customerType,
      price: totalPrice,
    });

    await visit.save({ session });

    const date = new Date(nextFollowUp);

    const attendance = await Attendance.findOne({
      date,
    });

    if (attendance) {
      attendance.List.push({ petId,purpose:followUpPurpose});
      await attendance.save();
    } else {
      const attendance = new Attendance({
        date,
      });
      await attendance.save();
      attendance.List.push({ petId,purpose:followUpPurpose});
      await attendance.save();
    }

    await session.commitTransaction();

    res.json({
      success:true,
      message: "Visit saved successfully",
    });
  } catch (error) {
    console.log("error in addvisit controllere", error)
    await session.abortTransaction();
    console.log("Error in addvisit controller ",error)
    res.status(500).json({ 
      success:false,
      message: error.message, 
    });
  } finally {
    session.endSession();
  }
};

exports.getVisit = async (req, res) => {
  try {
    const { type } = req.query;
    const today = new Date();

    let nextDate = new Date();

    if (type === "today") {
      nextDate = new Date(today);
      nextDate.setDate(today.getDate() + 2);
    } else {
      nextDate = new Date(today);
      nextDate.setDate(today.getDate() + 7);
    }

    nextDate.setHours(0, 0, 0, 0);
    const endOfNextDate = new Date(nextDate);
    endOfNextDate.setHours(23, 59, 59, 999);

    const List = await Visit.find({
      nextFollowUp: {
        $gte: nextDate,
        $lt: endOfNextDate,
      },
    }).populate({
      path: "pet",
      populate: {
        path: "owner",
      },
    });

    if (List) {
      return res.status(200).json({
        success: true,
        message: "List fetched successfully",
        List,
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Invalid data",
      });
    }
  } catch (error) {
    console.log("Error in getVisitController", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
