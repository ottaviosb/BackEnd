import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../models/User';
import uploadConfig from '../config/upload';
import AppError from '../errors/AppError';

interface Request {
  user_id: string;
  avatarFilename: string;
}
class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const userRepository = getRepository(User);

    // Procura por um usuário
    const user = await userRepository.findOne(user_id);
    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    if (user.avatar) {
      // Deletar avatar anterior
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      // Função stat tras o status de um arquivo (se ele existir)
      const userAvatarFileExists = await fs.promises.stat;

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }

      // Atualiza novo caminho do usuário e salva novo estado
      user.avatar = avatarFilename;
      await userRepository.save(user);

      return user;
    }
  }
}

export default UpdateUserAvatarService;
