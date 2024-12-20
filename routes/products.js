import { Router } from 'express';
const router = Router();
import { listProducts, createProduct, deleteProduct, getProduct } from '../controllers/productController.js';
import authMiddleware from '../middleware/middleware.js';
// /products
// Endpoint para listar productos con filtros y paginación
router.get('/', authMiddleware, listProducts); //
router.post('/', authMiddleware, createProduct);
router.delete('/:id', authMiddleware, deleteProduct);
router.get('/:id', authMiddleware, getProduct);
export default router;