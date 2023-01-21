import express from 'express';
import toDoListController from '../../controllers/toDoList.controller';

const router = express.Router();

router.route('/all').get(toDoListController.getList);

export = router;
