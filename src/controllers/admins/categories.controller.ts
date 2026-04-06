import { categoryDto, categoryFilterDto } from "../../dto/categories.dto";
import { admin } from "../../interfaces/admin.interface";
import { Res } from "../../interfaces/reqAndReq.interface";
import { deleteCategoryService, getAllCategoryService, getCategoryService, postCategoryService, putCategoryService } from "../../services/admins/categories.service";
import { deleteAgentService } from "../../services/agents/agentManage.service";

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
        const data: any = await getAllCategoryService(filter);
        res.status(200).json({
            code: "success",
            data: data.data,
            totalPage: data.pagination.totalPage

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
        if (req.file) {
            req.body.image = req.file.path;
        } else {
            delete req.body.image
        };
        const data: categoryDto = req.body;
        const bool: any = await putCategoryService(data, Number(req.params.id), req.admin.id);

        if (bool === false) {
            res.status(400).json({
                code: "error",
                message: "A category update fail!"
            })
        };

        res.status(200).json({
            code: "success",
            message: "A category update successfully!"
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
        const data: number = Number(req.params.id);
        const bool: any = await getCategoryService(data);

        if (bool === false) {
            res.status(404).json({
                code: "error",
                message: "A category not found!"
            })
        }
        res.status(200).json({
            code: "success",
            data: bool
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
        const bool: any = deleteCategoryService(Number(req.params.id), Number(req.admin.id));

        if (bool === false) {
            res.status(404).json({
                code: "success",
                message: "A category not found!"
            })
        }
        res.status(200).json({
            code: "success",
            message: "A category delete successfully!"
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            code: "error",
            message: "Invalid token"
        })
    }
}