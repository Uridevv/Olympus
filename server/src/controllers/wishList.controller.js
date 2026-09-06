import WishList from '../models/wishList.model.js'

export const getWishList = async (req, res) => {
  const { id } = req.params;
  try {
    const wishList = await WishList.findOne({ userId: id });
    if (!wishList) return res.status(404).json({ message: "Wishlist not found" })

    res.status(200).json(wishList);
  } catch (error) {
    res.status(500).json({ message: "Error fetching wishlist", error: error.message });
  }

}

export const addWishItem = async (req, res) => {
  const { id } = req.params; // userId
  const newItem = req.body; // { id, price, url }

  try {
    let wishList = await WishList.findOne({ userId: id });

    if (!wishList) {
      wishList = new WishList({
        userId: id,
        items: [{
          productId: newItem.productId,
          name: newItem.name,
          price: newItem.price,
          url: newItem.url,

        }],
      });
      await wishList.save();
      return res.status(201).json({ message: 'Wishlist created and item added', wishList });
    }

    // Verificar si el producto ya existe
    const itemExists = wishList.items.some(
      item => item.productId.toString() === newItem.id
    );

    if (itemExists) {
      return res.status(400).json({ message: 'Item already exists in wishlist' });
    }

    // Agregar nuevo producto
    wishList.items.push({
      productId: newItem.productId,
      name: newItem.name,
      price: newItem.price,
      url: newItem.url,
    });
    await wishList.save();

    return res.status(200).json({ message: 'Item added to wishlist', wishList });
  } catch (error) {
    res.status(500).json({ message: 'Error adding item to wishlist', error: error.message });
  }
};

export const deleteWishItem = async (req, res) => {
  const { id } = req.params; // userId
  const { productId } = req.body; // id del producto a quitar

  try {
    const wishList = await WishList.findOne({ userId: id });

    if (!wishList) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    // Buscar el índice del item a eliminar
    const itemIndex = wishList.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in wishlist' });
    }

    // Eliminar el item
    wishList.items.splice(itemIndex, 1);
    await wishList.save();

    return res.status(200).json({ message: 'Item removed from wishlist', wishList });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item from wishlist', error: error.message });
  }
};

export const productInWishList = async (req, res) => {
  const { id } = req.params;
  const { productId } = req.body;

  try {

    const wishList = await WishList.findOne({ userId: id });
    if (!wishList) return res.status(404).json({ message: "Wishlist not found" })


    // Verificar si el producto ya existe
    const itemExists = wishList.items.some(
      item => item.productId.toString() === productId
    );

    if (itemExists) {
      return res.status(200).json({ message: 'Item already exists in wishlist', state: true });
    } else {
      return res.status(200).json({ message: 'Item dont exist ', state: false });
    }
  } catch (error) {
    res.status(500).json({ message: "Error validating product", error: error.message });
  }
}