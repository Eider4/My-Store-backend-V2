import UserRepository from "../../infrastructure/db/repositories/userRepository.js";

const userRepository = new UserRepository();

export const getUsers = async () => {
  const users = await userRepository.getUsers();
  return users;
};

export const getUserById = async (id) => {
  const user = await userRepository.getUserById(id);
  return user;
};

export const addUser = async (user) => {
  const id = await userRepository.addUser(user);
  return id;
};

export const updateUser = async (id, user) => {
  const updated = await userRepository.updateUser(id, user);
  return updated;
};
