import userRoutes from './user.route';

const routes = (app: any) => {
  app.use('/auth', userRoutes);
};

export default routes;
