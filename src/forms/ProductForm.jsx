import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, fetchProducts} from "../features/store/productSlice";
import {
    createCategory,
    fetchCategories,
} from "../features/store/categorySlice";

const ProductForm = () => {

    const dispatch = useDispatch();

    const [categoryData, setCategoryData] = useState({
        name: "",
        imageUrl: "",
    });

    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        imageUrl: "",
    });

    const { categories } = useSelector((state) => state.categories)

    useEffect(() => {
        dispatch(fetchCategories());       
    }, [dispatch]);

    const handleCategoryInputChange = (e) => {
        const { name, value } = e.target;
        setCategoryData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleProductInputChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({
            ...prevData,
            [name]: name === "price" || name === "stock" ? parseInt(value) : value,
        }));
    };

    const handleCategorySubmit = async (e) => {
        e.preventDefault();

        try{
            dispatch(createCategory(categoryData))
            alert('Category created successfully')
            setCategoryData({
                name: "",
                imageUrl: "",
            })
        }
        catch(error){
            alert('Error creating category!')
        }
    };

    const handleProductSubmit = async (e) => {
        e.preventDefault(); 

       try{
            dispatch(createProduct(productData));
            alert('Product created successfully');
            setProductData({
                name: "",
                description: "",
                price: "",
                stock: "",
                category: "",
                imageUrl: "",
            })
       }
       catch(error){
        alert('Error creating product');
       }
    };

    return (
        <div style={{ padding: "2rem", display: 'flex', gap: '2rem',  justifyContent: 'center'}}>
            <div>
            <h2>Create a Category</h2>
            <form onSubmit={handleCategorySubmit}>
                <div>
                    <label htmlFor="name">Category Name:</label> <br />
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={categoryData.name}
                        onChange={handleCategoryInputChange}
                        required
                    />
                </div>
                <br />

                <div>
                    <label htmlFor="categoryImage">Category Image:</label> <br />
                    <input
                        type="text"
                        id="categoryImage"
                        name="imageUrl"
                        value={categoryData.imageUrl}
                        onChange={handleCategoryInputChange}
                    />
                </div>

                <br />

                <button type="submit">Create Category</button>
            </form>
            </div>

            <hr />

            <div>
            <h2>Create a Product</h2>
            <form onSubmit={handleProductSubmit}>
                <div>
                    <label htmlFor="name">Product Name:</label>
                    <br />
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={productData.name}
                        onChange={handleProductInputChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="description">Description:</label>
                    <br />
                    <textarea
                        id="description"
                        name="description"
                        value={productData.description}
                        onChange={handleProductInputChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="price">Price:</label>
                    <br />
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={productData.price}
                        onChange={handleProductInputChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="stock">Stock:</label>
                    <br />
                    <input
                        type="number"
                        id="stock"
                        name="stock"
                        value={productData.stock}
                        onChange={handleProductInputChange}
                        required
                    />
                </div>
                <br />

                <div>
                    <label htmlFor="category">Category:</label>
                    <br />
                    <select
                        name="category"
                        id="category"
                        value={productData.category}
                        onChange={handleProductInputChange}
                        required
                    >
                        <option value="">Select a Category</option>
                        {categories && categories.length > 0 ? (
                            categories.map((category) => (
                                <option key={category._id} value={category.name}>
                                    {category.name}
                                </option>
                            ))
                        ) : (
                            <option disabled>No categories available</option>
                        )}
                    </select>
                </div>
                <br />

                <div>
                    <label htmlFor="imageUrl">Image URL (Optional):</label>
                    <br />
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        value={productData.imageUrl}
                        onChange={handleProductInputChange}
                    />
                </div>
                <br />

                <button type="submit">Create Product</button>
            </form>
            </div>
        </div>
    );
};

export default ProductForm;
