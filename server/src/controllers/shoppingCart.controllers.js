import ShoppingCart from '../models/shoppingCart.model.js';
import Product from '../models/product.model.js'; // si necesitas verificar precio

// Obtener carrito activo
export const getShoppingCart = async (req, res) => {
  const { id } = req.params;

  try {
    const cart = await ShoppingCart.findOne({ userId: id, status: 'active' }).populate('items.productId');

    if (!cart) {
      return res.status(404).json({ message: 'Shopping cart not found' });
    }

    return res.status(200).json({ cart, total: cart.totalPrice });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Crear o actualizar el carrito
export const createOrUpdateShoppingCart = async (req, res) => {
  const { id } = req.params; // id del usuario
  const { items } = req.body; // items = array de productos [{productId, quantity, size, color, url}]

  try {
    let cart = await ShoppingCart.findOne({ userId: id, status: 'active' });

    if (!cart) {
      cart = new ShoppingCart({
        userId: id,
        items,
        status: 'active'
      });
      await cart.save();
      return res.status(201).json({ message: 'Shopping cart created', cart });
    }

    // Si ya existe, se reemplazan los ítems
    cart.items = items;
    await cart.save();
    return res.status(200).json({ message: 'Shopping cart updated', cart });

  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Marcar carrito como "abandoned"
export const disableShoppingCart = async (req, res) => {
  const { id } = req.params;

  try {
    const cart = await ShoppingCart.findOne({ userId: id, status: 'active' });

    if (!cart) {
      return res.status(404).json({ message: 'Active cart not found' });
    }

    cart.status = 'abandoned';
    await cart.save();

    return res.status(200).json({ message: 'Shopping cart abandoned', cart });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Marcar carrito como "completed" después de compra
export const successShoppingCart = async (req, res) => {
  const { id } = req.params;

  try {
    const cart = await ShoppingCart.findOne({ userId: id, status: 'active' }).populate('items.productId');

    if (!cart) {
      return res.status(404).json({ message: 'Active cart not found' });
    }

    cart.status = 'completed';
    await cart.save();

    return res.status(200).json({ message: 'Shopping cart completed', cart, total });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

export const addItemToCart = async (req, res) => {
  const { id } = req.params; // userId
  const newItem = req.body; // { productId, quantity, size, color, price, url }
  try {
    let cart = await ShoppingCart.findOne({ userId: id, status: 'active' });

    if (!cart) {
      // Si no hay carrito, lo creamos con el nuevo item
      cart = new ShoppingCart({
        userId: id,
        items: [newItem],
      });
      await cart.save();
      return res.status(201).json({ message: 'Cart created with item', cart });
    }

    // Buscar si ya existe un ítem igual (mismo producto + talla + color)
    const existingItemIndex = cart.items.findIndex(
      item =>
        item.productId.toString() === newItem._id &&
        item.size === newItem.size &&
        item.color === newItem.color
    );

    if (existingItemIndex !== -1) {
      // Si existe, solo actualizamos la cantidad
      cart.items[existingItemIndex].quantity += newItem.quantity;
    } else {
      // Si no existe, lo agregamos
      cart.items.push(newItem);
    }

    await cart.save();
    return res.status(200).json({ message: 'Item added to cart', cart });

  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

export const decreaseCartItem = async (req, res) => {
  const { id } = req.params; // userId
  const newItem = req.body; // { productId, quantity, size, color, price, url }

  try {
    let cart = await ShoppingCart.findOne({ userId: id, status: 'active' });

    // Buscar si ya existe un ítem igual (mismo producto + talla + color)
    const existingItemIndex = cart.items.findIndex(
      item =>
        item.productId.toString() === newItem._id &&
        item.size === newItem.size &&
        item.color === newItem.color
    );

    if (existingItemIndex !== -1) {
      // Si existe, solo actualizamos la cantidad
      cart.items[existingItemIndex].quantity -= newItem.quantity;
    } else {
      // Si no existe, lo agregamos
      cart.items.push(newItem);
    }

    await cart.save();
    return res.status(200).json({ message: 'Item decrease to cart', cart });

  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
}

export const updateCartItem = async (req, res) => {
  const { id } = req.params; // userId
  const { productId, size, color, quantity } = req.body;

  try {
    const cart = await ShoppingCart.findOne({ userId: id, status: 'active' });

    if (!cart) {
      return res.status(404).json({ message: 'Active cart not found' });
    }

    const itemIndex = cart.items.findIndex(
      i =>
        i.productId.toString() === productId &&
        i.size === size &&
        i.color === color
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    const item = cart.items[itemIndex];

    if (item.quantity <= quantity) {
      // Eliminar el item si la cantidad resultante sería 0 o negativa
      cart.items.splice(itemIndex, 1);
    } else {
      // Disminuir la cantidad
      item.quantity -= quantity;
    }

    await cart.save();
    return res.status(200).json({ message: 'Cart item updated', cart });

  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

export const removeItemFromCart = async (req, res) => {
  const { id } = req.params; // userId
  const { _id, size, color } = req.body;

  try {
    const cart = await ShoppingCart.findOne({ userId: id, status: 'active' });

    if (!cart) {
      return res.status(404).json({ message: 'Active cart not found' });
    }

    const newItems = cart.items.filter(
      item =>
        !(item.productId.toString() === _id && item.size === size && item.color === color)
    );

    if (newItems.length === cart.items.length) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    cart.items = newItems;

    await cart.save();
    return res.status(200).json({ message: 'Item removed from cart', cart });

  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};