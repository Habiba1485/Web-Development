const Property = require("../models/property-model");
const fs = require("fs");
const path = require("path");


// GET ALL PROPERTIES
const getAllProperties = async (req, res) => {
  try {

    const properties = await Property.find();

    res.status(200).json({
      status: "success",
      count: properties.length,
      data: properties
    });

  } catch (error) {

    res.status(500).json({
      status: "fail",
      message: error.message
    });

  }
};


// GET PROPERTY BY ID
const getPropertyById = async (req, res) => {
  try {

    const property = await Property.findById(req.params.id)
      .populate("host", "name email");

    if (!property) {
      return res.status(404).json({
        status: "fail",
        message: "Property not found"
      });
    }

    res.status(200).json({
      status: "success",
      data: property
    });

  } catch (error) {

    res.status(500).json({
      status: "fail",
      message: error.message
    });

  }
};


// CREATE PROPERTY
const createProperty = async (req, res) => {
  try {

    const images = req.files
      ? req.files.map(file => file.filename)
      : [];

    const property = await Property.create({
      ...req.body,
      host: req.userId,
      images: images
    });

    res.status(201).json({
      status: "success",
      data: property
    });

  } catch (error) {

    res.status(400).json({
      status: "fail",
      message: error.message
    });

  }
};


// UPDATE PROPERTY
const updateProperty = async (req, res) => {
  try {

    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        status: "fail",
        message: "Property not found"
      });
    }

    // Only the host who owns the property can update it
    if (property.host.toString() !== req.userId) {
      return res.status(403).json({
        status: "fail",
        message: "You can only update your own property"
      });
    }

    let updateData = {
      ...req.body
    };

    if (req.files && req.files.length > 0) {

      updateData.images = req.files.map(
        file => file.filename
      );

    }

    const updatedProperty =
      await Property.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          returnDocument: "after",
          runValidators: true
        }
      );

    res.status(200).json({
      status: "success",
      data: updatedProperty
    });

  } catch (error) {

    res.status(400).json({
      status: "fail",
      message: error.message
    });

  }
};


// DELETE PROPERTY
const deleteProperty = async (req, res) => {
  try {

    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        status: "fail",
        message: "Property not found"
      });
    }

    // Only owner can delete
    if (property.host.toString() !== req.userId) {
      return res.status(403).json({
        status: "fail",
        message: "You can only delete your own property"
      });
    }

    await Property.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "success",
      message: "Property deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      status: "fail",
      message: error.message
    });

  }
};


// UPLOAD PROPERTY VERIFICATION DOCUMENTS
const uploadPropertyVerification = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        status: "fail",
        message: "Property not found"
      });
    }

    if (property.host.toString() !== req.userId) {
      return res.status(403).json({
        status: "fail",
        message: "You can only submit verification for your own property"
      });
    }

    const docFiles = req.files
      ? req.files.map(file => file.filename)
      : (req.file ? [req.file.filename] : []);

    if (docFiles.length === 0) {
      return res.status(400).json({
        status: "fail",
        message: "Please upload at least one verification document"
      });
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      {
        verificationStatus: "pending",
        verificationDocuments: [...property.verificationDocuments, ...docFiles]
      },
      {
        returnDocument: "after",
        runValidators: true
      }
    );

    res.status(200).json({
      status: "success",
      message: "Property verification documents uploaded successfully",
      data: updatedProperty
    });

  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message
    });
  }
};


module.exports = {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  uploadPropertyVerification
};