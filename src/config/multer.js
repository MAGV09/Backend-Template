const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({ secure: true });
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'images', // folder name on Cloudinary
    allowed_formats: ['jpg', 'png', 'webp'],
    // transformation: [{ width: 800, crop: 'limit' }], // optional resize
  },
});

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

module.exports = upload;
