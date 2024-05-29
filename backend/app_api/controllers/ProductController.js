import mongoose from "mongoose";
const Product = mongoose.model("product");

const createResponse = (res, status, content) => {
    res.status(status);
    res.json(content);
}

const listProducts = async (req, res) => {
    try {
        const products = await Product.find().exec();
        createResponse(res, 200, products);
    } catch (error) {
        createResponse(res, 404, { status: "Ürünler bulunamadı" });
    }
}

const addProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        createResponse(res, 201, product);
    } catch (error) {
        createResponse(res, 400, error);
    }
}

const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productid).exec();
        createResponse(res, 200, product);
    } catch (error) {
        createResponse(res, 404, { status: "Ürün bulunamadı" });
    }
}

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.productid, req.body, { new: true }).exec();
        createResponse(res, 200, product);
    } catch (error) {
        createResponse(res, 404, { status: "İşlem başarısız oldu" });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.productid);
        createResponse(res, 200, { status: `${product.name} isimli ürün silindi` });
    } catch (error) {
        createResponse(res, 404, { status: "İşlem başarısız oldu" });
    }
}

export {
    listProducts,
    addProduct,
    getProduct,
    updateProduct,
    deleteProduct
};
