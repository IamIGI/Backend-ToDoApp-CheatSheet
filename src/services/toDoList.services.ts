import { LeanDocument, Types } from 'mongoose';
import ToDoModel, { ToDoDocument, ToDoObject } from '../model/ToDoList';
import currentDate from '../utils/currentDate';

/** return  all items from to do list */
async function getToDoList(): Promise<
  LeanDocument<
    ToDoDocument & {
      _id: Types.ObjectId;
    }
  >[]
> {
  const result = await ToDoModel.find({}).sort({ $natural: -1 }).lean();
  return result;
}
/**Save item to list */
async function saveToDoItem(
  object: ToDoObject
): Promise<{ status: number; message: string; ToDoId?: string; reason?: unknown }> {
  const date = currentDate.getDate();
  object.date = date;
  object.isDone = false;
  try {
    const newToDoItem = new ToDoModel(object);
    const result = await newToDoItem.save();

    return { status: 201, message: 'Item added to ToDo list', ToDoId: result._id };
  } catch (err) {
    return { status: 500, message: 'Could not save Item', reason: err };
  }
}

/** delete item from list */
async function deleteOne(id: string): Promise<{ status: number; message: string; reason?: unknown }> {
  try {
    const isExists = await ToDoModel.findOne({ _id: id }).exec();
    if (!isExists) return { status: 404, message: 'Could not find given ToDo item' };

    await ToDoModel.deleteOne({ _id: id });
    return { status: 201, message: 'Item deleted' };
  } catch (err) {
    return { status: 500, message: 'Could not save Item', reason: err };
  }
}

/** edit item from list */
async function edit(
  id: string,
  title: string,
  userName: string
): Promise<{ status: number; message: string; id?: string; reason?: unknown }> {
  const date = currentDate.getDate();

  try {
    const isExists = await ToDoModel.findOne({ _id: id }).exec();
    if (!isExists) return { status: 400, message: 'Could not find given ToDo item' };

    await ToDoModel.updateOne(
      { _id: id },
      {
        $set: {
          title,
          date,
          userName,
        },
      }
    );

    return { status: 201, message: 'Item successfully edited' };
  } catch (err) {
    return { status: 500, message: 'Other Error', reason: err };
  }
}

async function editIsDone(id: string): Promise<{ status: number; message: string; id?: string; reason?: unknown }> {
  try {
    const isExists = await ToDoModel.findOne({ _id: id }).exec();
    if (!isExists) return { status: 404, message: 'Could not find given ToDo item' };

    await ToDoModel.updateOne(
      { _id: id },
      {
        $set: {
          isDone: !isExists.isDone,
        },
      }
    );

    return { status: 201, message: 'Item successfully edited' };
  } catch (err) {
    return { status: 500, message: 'Other Error', reason: err };
  }
}

export default { getToDoList, saveToDoItem, deleteOne, edit, editIsDone };
