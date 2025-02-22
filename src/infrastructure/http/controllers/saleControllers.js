import {
  getSales,
  getSaleById,
  getSalesFiltered,
  addSale,
} from "../../../app/tables/saleService.js";

export const getSalesController = async (req, res) => {
  const sales = await getSales();
  res.status(200).json(sales);
};

export const getSaleByIdController = async (req, res) => {
  const { id } = req.params;
  const sale = await getSaleById(id);
  res.status(200).json(sale);
};

export const getSalesFilteredController = async (req, res) => {
  const { filter } = req.params;
  const sales = await getSalesFiltered(filter);
  res.status(200).json(sales);
};

export const addSaleController = async (req, res) => {
  const { sale } = req.body;
  const id = await addSale(sale);
  res.status(200).json({ id });
};
