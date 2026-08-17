import { Request, Response } from "express";
import { T } from "../libs/types/common";
import Errors, { HttpCode, Message } from "../libs/types/Errors";
import { ProductInput, ProductInquiry } from "../libs/types/product";
import ProductService from "../models/Product.service";
import { AdminRequest, ExtentedRequest } from "../libs/types/member";
import { ProductBrand, ProductCategory } from "../libs/enums/product.enum";
import LikeService from "../models/Like.service";

const productService = new ProductService();
const likeService = new LikeService();
const productController: T = {};

/** SPA **/

productController.getProducts = async (req: Request, res: Response) => {
  try {
    console.log("getProducts");
    const {
      page,
      limit,
      order,
      productCategory,
      productBrand,
      search,
      minPrice,
      maxPrice,
    } = req.query;

    const inquiry: ProductInquiry = {
      order: String(order),
      page: Number(page),
      limit: Number(limit),
    };

    if (productCategory)
      inquiry.productCategory = productCategory as ProductCategory;
    if (productBrand) inquiry.productBrand = productBrand as ProductBrand;
    if (search) inquiry.search = String(search);
    if (minPrice) inquiry.minPrice = Number(minPrice);
    if (maxPrice) inquiry.maxPrice = Number(maxPrice);

    const result = await productService.getProducts(inquiry);

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, getProducts", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

productController.getProduct = async (req: ExtentedRequest, res: Response) => {
  try {
    console.log("getProduct");
    const { id } = req.params;
    const memberId = req.member?._id ?? null,
      result = await productService.getProduct(memberId, id);

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, getProduct", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

productController.productLike = async (req: ExtentedRequest, res: Response) => {
  try {
    console.log("productLike");
    const { id } = req.params;
    if (!req.member)
      throw new Errors(HttpCode.UNAUTHORIZED, Message.NOT_AUTHENTICATED);
    const memberId = req.member._id,
      result = await likeService.productLike(memberId, id);

    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, productLike", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};
/** SSR **/

productController.getAllProduct = async (req: Request, res: Response) => {
  try {
    console.log("getAllProduct");
    const data = await productService.getAllProduct();
    res.render("products", { products: data });
  } catch (err) {
    console.log("Error, getAllProduct", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

productController.getNewProduct = async (req: Request, res: Response) => {
  try {
    console.log("getNewProduct");
    res.render("newproduct");
  } catch (err) {
    console.log("Error, getNewProduct", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

productController.createNewProduct = async (
  req: AdminRequest,
  res: Response
) => {
  try {
    console.log("createNewProduct");
    console.log(req.body);
    if (!req.files?.length)
      throw new Errors(HttpCode.BAD_REQUEST, Message.SOMETHING_WENT_WRONG);
    console.log("body:", req.body);
    const product: ProductInput = req.body;
    product.productImages = req.files?.map((ele) => {
      return ele.path;
    });
    await productService.createNewProduct(product);
    return res.send(`
  <script>
    alert("Successful creation!");
    window.location.replace("/admin/product/all");
  </script>
`);
  } catch (err) {
    console.log("Error, createNewProduct", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script> alert("${message}"); window.location.replace('/admin/product/all') </script>`
    );
  }
};

productController.updateChosenProduct = async (req: Request, res: Response) => {
  try {
    console.log("updateProduct");
    const id = req.params.id;
    const result = await productService.updateChosenProduct(id, req.body);
    res.status(HttpCode.OK).json({ data: result });
  } catch (err) {
    console.log("Error, updateProduct", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standard.code).json(Errors.standard);
  }
};

export default productController;
