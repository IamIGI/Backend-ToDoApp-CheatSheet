import ToDoModel, { ToDoDocument } from '../model/ToDoList';
/** return  all items from to do list */
async function getToDoList(): Promise<ToDoDocument> {
    return await ToDoModel.find({}).sort({ $natural: -1 }).lean();
}

export default { getToDoList };
