const streamifier = require("streamifier");
const cloudinary = require("../config/cloudinary");
const Resume = require("../models/Resume");

// Get current resume
const getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne();

    if (!resume) {
      return res.status(404).json({
        message: "No resume uploaded yet.",
      });
    }

    res.json(resume);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch resume.",
    });
  }
};

// Upload / replace resume
const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please select a PDF resume.",
      });
    }

    const existingResume = await Resume.findOne();

    // Upload new resume to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "portfolio/resume",
          resource_type: "raw",
          public_id: "Adarsh_Resume.pdf",
          overwrite: true,
          type: "upload",
          access_mode: "public",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );

      streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    });

    // Remove old Cloudinary file if it exists
    if (
      existingResume &&
      existingResume.publicId &&
      existingResume.publicId !== result.public_id
    ) {
      try {
        await cloudinary.uploader.destroy(existingResume.publicId, {
          resource_type: "raw",
        });
      } catch (deleteError) {
        console.error(
          "Old resume deletion failed:",
          deleteError.message,
        );
      }
    }

    // Replace database record
    const resume = await Resume.findOneAndUpdate(
      {},
      {
        fileName: req.file.originalname,
        url: result.secure_url,
        publicId: result.public_id,
      },
      {
        returnDocument: "after",
        upsert: true,
        setDefaultsOnInsert: true,
      },
    );

    res.status(200).json({
      message: "Resume uploaded successfully.",
      resume,
    });
  } catch (error) {
    console.error("Resume upload error:", error);

    res.status(500).json({
      message: "Failed to upload resume.",
    });
  }
};

// Delete resume
const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOne();

    if (!resume) {
      return res.status(404).json({
        message: "No resume found.",
      });
    }

    await cloudinary.uploader.destroy(resume.publicId, {
      resource_type: "raw",
    });

    await Resume.deleteOne({
      _id: resume._id,
    });

    res.json({
      message: "Resume deleted successfully.",
    });
  } catch (error) {
    console.error("Resume delete error:", error);

    res.status(500).json({
      message: "Failed to delete resume.",
    });
  }
};

module.exports = {
  getResume,
  uploadResume,
  deleteResume,
};