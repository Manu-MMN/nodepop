import { Router } from 'express';
const router = Router();
import { listProducts, createProduct, deleteProduct, getProduct, updateProduct } from '../controllers/productController.js';
import authMiddleware from '../middleware/middleware.js';
import upload from "../lib/uploadConfigure.js";

// /products
// Endpoint para listar productos con filtros y paginación
router.get('/', authMiddleware, listProducts);
router.post('/', authMiddleware, upload.single("image"), createProduct);
router.delete('/:id', authMiddleware, deleteProduct);
router.get('/:id', authMiddleware, getProduct);
router.put('/:id', authMiddleware, updateProduct);

// Página para crear nuevo producto
router.get('/new', (req, res) => {
    if (!req.user || !req.user._id) {
        return res.redirect('/login');
    }
    res.render('newProduct');
});

export default router;
