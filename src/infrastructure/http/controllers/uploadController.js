import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../../config/cloudinary.js";

// Configurar almacenamiento en Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "productos",
    format: async (req, file) => "png", // o "jpeg"
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

const upload = multer({ storage }).array("imagenes", 5); // Hasta 5 imágenes

export const uploadImages = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error uploading files", error: err });
    }
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No se subieron archivos" });
    }

    try {
      // Subir cada imagen a Cloudinary y guardar las URLs
      const uploadedImages = await Promise.all(
        req.files.map(async (file) => {
          const result = await cloudinary.uploader.upload(file.path);
          return result.secure_url; // Devuelve la URL de cada imagen
        })
      );

      // También puedes obtener otros datos del formulario
      const { title, price, description } = req.body;

      return res.status(200).json({
        message: "Images uploaded successfully",
        images: uploadedImages,
        title,
        price,
        description,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error uploading images", error });
    }
  });
};
export const deleteImages = async (req, res) => {
  try {
    const publicIds = req.body.map((urlImage) => {
      const publicId = urlImage.split("/").pop();
      return publicId.split(".")[0];
    });
    if (!Array.isArray(publicIds) || publicIds.length === 0) {
      return res
        .status(400)
        .json({ message: "Debe proporcionar un array de publicIds válido" });
    }

    // Mapear y ejecutar las eliminaciones en paralelo
    const results = await Promise.all(
      publicIds.map(async (id) => {
        const result = await cloudinary.uploader.destroy(id);
        return { id, status: result.result }; // Guardar el estado de cada eliminación
      })
    );

    // Filtrar los eliminados correctamente y los errores
    const deleted = results.filter((res) => res.status === "ok");
    const failed = results.filter((res) => res.status !== "ok");

    res.json({
      message: "Proceso de eliminación completado",
      deleted,
      failed,
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};
