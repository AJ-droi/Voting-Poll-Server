import { Router } from 'express';
import AdminRoutes from './AdminRoutes'
import AuthRoutes from './AuthRoutes'
import ElectionResultRoutes from './ElectionResultRoutes'
import AgentRoutes from './AgentRoutes'


// Create the main router
const router = Router();

// Use the imported route modules
router.use('/admin', AdminRoutes);            // All admin-related routes
router.use('/auth', AuthRoutes);              // All auth-related routes
router.use('/election-results', ElectionResultRoutes); // Election result upload route
router.use('/agents', AgentRoutes); // Election result upload route

// Export the router to be used in the app
export default router;
