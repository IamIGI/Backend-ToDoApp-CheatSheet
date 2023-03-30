import mongoose from 'mongoose';
export interface ToDoObject {
  userName: string;
  title: string;
  isDone?: boolean;
  date?: string;
}

export interface ToDoDocument extends ToDoObject, mongoose.Document {}

const Schema = mongoose.Schema;

const toDoSchema = new Schema({
  userName: String,
  title: String,
  isDone: Boolean,
  date: String,
});

const ToDoModel = mongoose.model<ToDoDocument>('ToDoLists', toDoSchema);

export default ToDoModel;
