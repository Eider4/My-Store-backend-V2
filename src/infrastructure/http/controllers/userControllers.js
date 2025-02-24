import {
  getUsers,
  getUserById,
  addUser,
  updateUser,
} from "../../../app/tables/userService.js";

export const getUsersController = async (req, res) => {
  const users = await getUsers();
  res.status(200).json(users);
};

export const getUserByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "error en getUserByIdController" });
  }
};

export const addUserController = async (req, res) => {
  try {
    const user = req.body;
    const userCreated = await addUser(user);
    const { id_user, name, email, role, created_at } = userCreated;
    res.status(200).json({
      userCreated: {
        id_user,
        name,
        email,
        role,
        created_at,
      },
      message: "Usuario creado correctamente",
    });
  } catch (error) {
    res.status(500).json({ error: "Error al crear usuario" });
  }
};

export const updateUserController = async (req, res) => {
  try {
    const updated = await updateUser(req.body);
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "error en updateUserController" });
  }
};
