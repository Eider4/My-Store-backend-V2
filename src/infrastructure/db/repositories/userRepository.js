import User from "../../../domain/User.js";

class UserRepository {
  async getUserById(id) {
    const user = await User.findByPk(id);
    return user;
  }
  async addUser(user) {
    const id = await User.create(user);
    return id;
  }
  async updateUser(id, user) {
    const updated = await User.update(user, {
      where: { id_user: id },
    });
    return updated;
  }
}

export default UserRepository;
