import SaleRepository from "../../infrastructure/db/repositories/saleRepository.js";

const saleRepository = new SaleRepository();

export const getSales = async () => {
  const sales = await saleRepository.getSales();
  return sales;
};

export const getSaleById = async (id) => {
  const sale = await saleRepository.getSaleById(id);
  return sale;
};

export const getSalesFiltered = async (filter) => {
  const sales = await saleRepository.getSalesFiltered(filter);
  return sales;
};

export const addSale = async (sale) => {
  const id = await saleRepository.addSale(sale);
  return id;
};
