import express from 'express';
import toDoListController from '../../controllers/toDoList.controller';

const router = express.Router();

router.route('/all').get(toDoListController.getList);
router.route('/add').post(toDoListController.addToDo);
router.route('/delete/:id').delete(toDoListController.deleteToDo);
router.route('/edit').patch(toDoListController.editToDo);
router.route('/edit/isDone').patch(toDoListController.editIsDone);

export = router;
