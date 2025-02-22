import Sale from "../../../domain/Sale.js";

class SaleRepository {
  async getSales() {
    const sales = await Sale.findAll();
    return sales;
  }
  async getSaleById(id) {
    const sale = await Sale.findByPk(id);
    return sale;
  }
  //este metodo sirve para filtrar por fecha
  async getSalesFiltered(filter) {
    const sales = await Sale.findAll({
      where: {
        sale_date: {
          [Op.iLike]: `%${filter}%`,
        },
      },
    });
    return sales;
  }
  async addSale(sale) {
    const [id] = await Sale.create(sale);
    return id;
  }
}

export default SaleRepository;
