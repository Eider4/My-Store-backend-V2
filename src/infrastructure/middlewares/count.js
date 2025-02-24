let petitions = 0;
const countPetitions = async (req, res, next) => {
  petitions++;
  console.log("Peticiones:", petitions);
  next();
};

export default countPetitions;
