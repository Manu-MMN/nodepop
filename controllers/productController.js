import Product from '../models/Items.js';

export async function createProduct(req, res) {
  
    try {  
      const { name, price, image, tags } = req.body;
  
      // Validar que los tags sean válidos
      const validTags = ['work', 'lifestyle', 'motor', 'mobile'];
      const areTagsValid = tags.every(tag => validTags.includes(tag));
      if (!areTagsValid) {
        return res.status(400).json({ message: 'Uno o más tags no son válidos' });
      }
  
      // Crear el producto con el owner asignado
      const newProduct = new Product({
        name,
        owner: req.user._id, // Asignar el ID del usuario autenticado como propietario
        price,
        image,
        tags,
      });
  
      await newProduct.save();
      res.status(201).json({ message: 'Producto creado exitosamente', product: newProduct });
  
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el producto' });
    }
  }

export async function listProducts(req, res) {
  try {
    const filters = {};
    // {}

    // Filtrar solo los productos del usuario autenticado
    
    filters.owner = req.user._id;
    // {owner: 6730cbec6f6c53c14b842ff6 }

    // Filtrar por tag
    if (req.query.tag) filters.tags = req.query.tag;

    // Filtrar por rango de precio
    if (req.query.price) {
      const [min, max] = req.query.price.split('-');
      filters.price = {};
      if (min) filters.price.$gte = parseFloat(min);     
      if (max) filters.price.$lte = parseFloat(max);
    }

    // Filtrar por nombre (que comience con)
    if (req.query.name) {
      filters.name = new RegExp('^' + req.query.name, 'i');
    }

    // Paginación y ordenación
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 1000;
    const sort = req.query.sort || 'price';

    // Buscar productos con los filtros aplicados
    const products = await Product.find(filters).skip(skip).limit(limit).sort(sort);
    res.json(products);

  } catch (error) {
    res.status(500).json({ error: 'Error al listar productos' });
  }
}

export async function deleteProduct(req, res) {
    try {
  
      const productId = req.params.id;
  
      // Buscar el producto por ID y verificar el propietario
      const product = await Product.findById(productId);//6730cbec6f6c53c14b843001
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      // comprobamos si el usuario es el propietario
      if (product.owner.toString() !== req.user._id) {
        return res.status(403).json({ message: 'No tienes permiso para eliminar este producto' });
      }
  
      // Eliminar el producto si el usuario es el propietario
      await Product.findByIdAndDelete(productId);
      res.json({ message: 'Producto eliminado exitosamente' });
  
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el producto' });
    }
  }
  export async function   getProduct(req, res) {
    try {
  
      const productId = req.params.id;
  
      // Buscar el producto por ID
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
  
      // Verificar si el usuario autenticado es el propietario
      if (product.owner.toString() !== req.user._id) {
        return res.status(403).json({ message: 'No tienes permiso para ver este producto' });
      }
  
      // Retornar los detalles del producto si el usuario es el propietario
      res.json(product);
  
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los detalles del producto' });
    }
  }

  export async function   listProductsPage(req, res) {
    try {
      const filters = {};
  
      // Filtrar por tag
      if (req.query.tag) filters.tags = req.query.tag;
  
      // Filtrar por rango de precio
      if (req.query.price) {
        const [min, max] = req.query.price.split('-');
        filters.price = {};
        if (min) filters.price.$gte = parseFloat(min);
        if (max) filters.price.$lte = parseFloat(max);
      }
  
      // Filtrar por nombre (que comience con)
      if (req.query.name) {
        filters.name = new RegExp('^' + req.query.name, 'i');
      }
  
      // Paginación y ordenación
      const skip = parseInt(req.query.skip) || 0;
      const limit = parseInt(req.query.limit) || 10;
      const sort = req.query.sort || 'name';
  
      // Obtener productos y poblar el campo owner para mostrar el nombre del propietario
      const products = await Product.find(filters)
        .skip(skip)
        .limit(limit)
        .sort(sort)
        .populate('owner', 'name'); // Popula solo el nombre del propietario
  
      // Renderizar la vista con los datos de productos
      res.render('index', { products });
  
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la lista de productos' });
    }
  }


  export async function updateProduct(req, res, next){
      try {
        const productId = req.params.id;
        const productData = req.body;

        //comprobamos si el producto existe
        const product = await Product.findById(productId)
        if (!product) {
          return res.status(404).json({
            message: "Producto no encontrado"
          })
        }
      
        //comprobamos si el usuario es el propietario del producto
        if (product.owner.toString() !== req.user._id ) {
          console.log(req.user.id)
          return res.status(403).json({
            message: "No tienes permiso para actualizar este producto"
          })
        }

        // Actualizamos el producto

        const updateThisProduct = await Product.findByIdAndUpdate(productId, productData, {
          new: true
        })

        res.json({
          message: "Producto actualizado con éxito!",
          result: updateThisProduct
        })

      } catch (error) {
        res.status(500).json({ error: "Error al actualizar el producto"})
      }
  }

