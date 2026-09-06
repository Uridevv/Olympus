import Category from '../models/category.model.js';

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();

        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const addCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        const newCategory = new Category({ name, description });
        const category = await newCategory.save();

        res.status(201).json(category);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const categoryFound = await Category.findByIdAndDelete(id);
        if (!categoryFound) return res.status(404).json({ message: 'Category not found' });

        res.status(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
        const categoryFound = await Category.findByIdAndUpdate(id, { name, description }, { new: true });
        if (!categoryFound) return res.status(404).json({ message: 'Category not found' });

        res.status(200).json(categoryFound);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}