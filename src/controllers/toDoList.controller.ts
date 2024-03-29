import { Request, Response } from 'express';
import toDoListServices from '../services/toDoList.services';

const getList = async (req: Request, res: Response) => {
  console.log(req.originalUrl);
  try {
    const list = await toDoListServices.getToDoList();

    return res.status(200).json(list);
  } catch (err) {
    console.error(err);
  }
};

const addToDo = async (req: Request, res: Response) => {
  console.log(req.originalUrl);
  const { userName, title }: { userName: string; title: string } = req.body;
  const object = {
    userName,
    title,
  };

  const result = await toDoListServices.saveToDoItem(object);
  console.log(result);
  return res.status(result.status).json({
    message: result.message,
    toDoId: result?.ToDoId,
    reason: result?.reason,
  });
};

const deleteToDo = async (req: Request, res: Response) => {
  console.log(req.originalUrl);
  const { id } = req.params;

  const result = await toDoListServices.deleteOne(id);
  console.log(result);
  return res
    .status(result.status)
    .json({ message: result.message, reason: result?.reason });
};

const editToDo = async (req: Request, res: Response) => {
  console.log(req.originalUrl);
  const { id, title, userName } = req.body;

  const result = await toDoListServices.edit(id, title, userName);
  console.log(result);
  return res
    .status(result.status)
    .json({ message: result.message, reason: result?.reason });
};

const editIsDone = async (req: Request, res: Response) => {
  console.log(req.originalUrl);
  const { id } = req.body;

  const result = await toDoListServices.editIsDone(id);
  console.log(result);
  return res
    .status(result.status)
    .json({ message: result.message, reason: result?.reason });
};

export default { getList, addToDo, deleteToDo, editToDo, editIsDone };
