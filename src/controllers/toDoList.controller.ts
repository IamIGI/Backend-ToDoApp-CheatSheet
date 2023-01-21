import { Request, Response } from 'express';
import toDoListServices from '../services/toDoList.services';

const getList = async (req: Request, res: Response) => {
    console.log(req.originalUrl);
    try {
        const list = toDoListServices.getToDoList();
        return res.status(200).json(list);
    } catch (err) {
        console.error(err);
    }
};

export default { getList };
