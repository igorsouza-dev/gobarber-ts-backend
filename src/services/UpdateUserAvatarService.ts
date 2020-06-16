import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../models/User';
import uploadConfig from '../config/upload';

interface Request {
  user_id: string;
  filename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, filename }: Request): Promise<User> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(user_id);
    if (!user) {
      throw new Error('User not found');
    }
    if (user.avatar) {
      const userAvatarFilename = path.join(uploadConfig.directory, user.avatar);
      try {
        const userAvatarExists = await fs.promises.stat(userAvatarFilename);
        if (userAvatarExists) {
          await fs.promises.unlink(userAvatarFilename);
        }
      } catch (e) {}
    }

    user.avatar = filename;
    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
