import { Res } from "../../interfaces/reqAndReq.interface";
import { user } from "../../interfaces/user.interface";
import { getAllproductService, getproductService, postProductService, putProductService, deleteProductService } from "../../services/agents/product.service";

export const postProductController = async (req: user, res: Res) => {
  try {
    if (req.file) {
      req.body.image = req.file.path;
    } else {
      delete req.body.image;
    };

    req.body.quantity = Number(req.body.quantity);
    req.body.price = Number(req.body.price);
    req.body.categoryArray = JSON.parse(req.body.categoryArray);

    const bool: any = await postProductService(req.body, req.user.id);

    if (bool === false) {
      return res.status(400).json({
        code: "error",
        message: "Your agent is not active!"
      })
    }
    res.status(200).json({
      code: "success",
      message: "Product create successfully!"
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      code: "error",
      message: "Product create fail!"
    })
  }
}

export const getAllProductController = async (req: user, res: Res) => {
  try {
    const filter: any = {
      search: req.query.search,
      price: req.query.price,
      quantity: req.query.quantity,
      categoryId: Number(req.query.categoryId),
      page: Number(req.query.page),
      limit: Number(req.query.limit)
    }
    const bool: any = await getAllproductService(req.user.id, filter);
    res.status(200).json({
      code: "success",
      data: bool.product,
      totalPage: bool.totalPage
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      code: "error",
      message: "Invalid token"
    })
  }
}

export const getProductController = async (req: user, res: Res) => {
  try {
    const bool: any = await getproductService(req.user.id, Number(req.params.id));
    if (bool === false) {
      return res.status(404).json({
        code: "error",
        message: "Product not found!"
      })
    }
    res.status(200).json({
      code: "success",
      data: bool
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      code: "error",
      message: "Invalid token!"
    })
  }
}

export const putProductController = async (req: user, res: Res) => {
  try {
    if (req.file) {
      req.body.image = req.file.path;
    } else {
      delete req.body.image;
    };

    req.body.price = Number(req.body.price);
    req.body.quantity = Number(req.body.quantity);
    req.body.categoryArray = JSON.parse(req.body.categoryArray);
    const bool: any = await putProductService(req.user.id, Number(req.params.id), req.body);

    if (bool === false) {
      return res.status(404).json({
        code: "error",
        message: "Product not found!"
      })
    }
    res.status(200).json({
      code: "success",
      message: "Product create successfully!"
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      code: "error",
      message: "Product create fail!"
    })
  }
}

export const deleteProductController = async (req: user, res: Res) => {
  try {
    const bool: any = await deleteProductService(req.user.id, Number(req.params.id));

    if (bool === false) {
      res.status(404).json({
        code: "error",
        message: 'Product not found!'
      })
    }
    res.status(200).json({
      code: "success",
      message: 'delete product successfully!'
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      code: "error",
      message: 'Invalid token'
    })
  }
}