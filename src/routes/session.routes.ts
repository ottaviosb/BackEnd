import { Router } from 'express';
import AutenticationUserService from '../services/AutenticationUserService';

const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const authuserservice = new AutenticationUserService();

  const { user, token } = await authuserservice.execute({
    email,
    password,
  });

  delete user.password;

  response.json({ user, token });
});

export default sessionRouter;
