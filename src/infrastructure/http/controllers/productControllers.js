import {
  getProducts,
  getProductById,
  getProductsFiltered,
  addProduct,
  updateProduct,
} from "../../../app/tables/productService.js";

export const getProductsController = async (req, res) => {
  const products = await getProducts();
  res.status(200).json(products);
};

export const getProductByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProductById(id);
    res.status(200).json(product);
  } catch {
    res.status(500).json({ message: "error al realizar la peticion" });
  }
};

export const getProductsFilteredController = async (req, res) => {
  try {
    const { filter } = req.params;

    const products = await getProductsFiltered(filter);
    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron productos", products: [] });
    }
    res.status(200).json({ products, message: "Productos encontrados" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al obtener productos" });
  }
};

export const addProductController = async (req, res) => {
  try {
    const product = await addProduct(req.body);
    if (!product)
      return res.status(400).json({ message: "Error al agregar producto" });

    res.status(200).json({ message: "Producto creado con éxito!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al agregar producto", error });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = req.body;
    const updated = await updateProduct(id, product);
    if (!updated || updated[0] === 0)
      return res.status(400).json({ message: "Error al actualizar producto" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar producto" });
  }
};
