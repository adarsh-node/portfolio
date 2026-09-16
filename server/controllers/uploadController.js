const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No image file provided",
      });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "portfolio/projects",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload failed:", error);

          return res.status(500).json({
            message: "Image upload failed",
          });
        }

        return res.status(200).json({
          message: "Image uploaded successfully",
          imageUrl: result.secure_url,
        });
      },
    );

    streamifier
      .createReadStream(req.file.buffer)
      .pipe(uploadStream);
  } catch (error) {
    console.error("Upload error:", error);

    res.status(500).json({
      message: "Image upload failed",
    });
  }
};

module.exports = { uploadImage };