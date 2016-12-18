import usersRoutes from './users';
import rolesRoutes from './roles';
import documentsRoutes from './documents';

module.exports = {
  apply: (expressApp) => {
    expressApp.use('/users', usersRoutes);
    expressApp.use('/roles', rolesRoutes);
    expressApp.use('/documents', documentsRoutes);

    // Add a catchall route here
    expressApp.get('*', (req, res) => res.status(404).send({
      message: '404: Resource not found',
    }));
  },
};
