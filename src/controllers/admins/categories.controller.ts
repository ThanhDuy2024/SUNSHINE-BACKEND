import { categoryDto, categoryFilterDto } from "../../dto/categories.dto";
import { admin } from "../../interfaces/admin.interface";
import { Res } from "../../interfaces/reqAndReq.interface";
import { getAllCategoryService, postCategoryService } from "../../services/admins/categories.service";

export const postCategory = async (req: admin, res: Res) => {
    try {
        if (req.file) {
            req.body.image = req.file.path;
        } else {
            delete req.body.image;
        };

        const data: categoryDto = req.body;

        const bool: any = await postCategoryService(data, req.admin.id);

        if (bool === false) {
            return res.status(400).json({
                code: "error",
                message: "Your category has been existed!"
            })
        }
        res.status(200).json({
            code: "success",
            message: "A category create successfully!"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            code: "error",
            message: "Invalid token"
        })
    }
}

export const getAllCategory = async (req: admin, res: Res) => {
    try {
        const filter: categoryFilterDto = {
            search: String(req.query.search),
            status: String(req.query.status),
            createdById: Number(req.query.createdById),
            updatedById: Number(req.query.updatedById),
            page: Number(req.query.page),
            limit: Number(req.query.limit)
        }
        const data = await getAllCategoryService(filter);
        res.status(200).json({
            code: "success",
            message: data
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            code: "error",
            message: "Invalid token"
        })
    }
}

export const putCategory = async (req: admin, res: Res) => {
    try {
        res.status(200).json({
            code: "success",
            message: "A category create successfully!"
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            code: "error",
            message: "Invalid token"
        })
    }
}

export const getCategory = async (req: admin, res: Res) => {
    try {
        res.status(200).json({
            code: "success",
            message: "A category create successfully!"
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            code: "error",
            message: "Invalid token"
        })
    }
}

export const deleteCategory = async (req: admin, res: Res) => {
    try {
        res.status(200).json({
            code: "success",
            message: "A category create successfully!"
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            code: "error",
            message: "Invalid token"
        })
    }
}