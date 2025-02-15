import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { projectExists } from "../middleware/project";
import { hasAuthorization, taskBelongsToProject, taskExists } from "../middleware/task";
import { authenticate } from "../middleware/auth";
import { TeamMemberController } from "../controllers/TeamController";
import { NoteController } from "../controllers/NoteController";

const router = Router()

router.use(authenticate)

router.post('/',
    body('projectName')
        .notEmpty().withMessage('El Nombre del Proyecto es obligatorio'),
    body('clientName')
        .notEmpty().withMessage('El Nombre del Cliente es obligatorio'),
    body('description')
        .notEmpty().withMessage('La Descripcion del Proyecto es obligatoria'),
    handleInputErrors,
    ProjectController.createProject
)

router.get('/', ProjectController.getAllProjects)

router.get('/:id',
    param('id').isMongoId().withMessage('Id no válido'),
    handleInputErrors,
    ProjectController.getProjectById
)

/* Routes for tasks */
router.param('projectId', projectExists)

router.put('/:projectId',
    param('projectId').isMongoId().withMessage('Id no válido'),
    body('projectName')
        .notEmpty().withMessage('El Nombre del Proyecto es obligatorio'),
    body('clientName')
        .notEmpty().withMessage('El Nombre del Cliente es obligatorio'),
    body('description')
        .notEmpty().withMessage('La Descripcion del Proyecto es obligatoria'),
    handleInputErrors,
    hasAuthorization,
    ProjectController.updateProject
)

router.delete('/:projectId',
    param('projectId').isMongoId().withMessage('Id no válido'),
    handleInputErrors,
    hasAuthorization,
    ProjectController.deleteProject
)

router.post('/:projectId/tasks',
    hasAuthorization,
    body('name')
        .notEmpty().withMessage('El Nombre de la tarea es obligatorio'),
    body('description')
        .notEmpty().withMessage('La Descripcion de la tarea es obligatoria'),
    handleInputErrors,
    TaskController.createTask
)

router.get('/:projectId/tasks',
    TaskController.getProjectTask
)

router.param('taskId', taskExists)
router.param('taskId', taskBelongsToProject)

router.get('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('Id no válido'),
    handleInputErrors,
    TaskController.getProjectTaskById
)

router.put('/:projectId/tasks/:taskId',
    hasAuthorization,
    param('taskId').isMongoId().withMessage('Id no válido'),
    body('name')
        .notEmpty().withMessage('El Nombre de la tarea es obligatorio'),
    body('description')
        .notEmpty().withMessage('La Descripcion de la tarea es obligatoria'),
    handleInputErrors,
    TaskController.updateTask
)

router.delete('/:projectId/tasks/:taskId',
    hasAuthorization,
    param('taskId').isMongoId().withMessage('Id no válido'),
    handleInputErrors,
    TaskController.deleteTask
)

router.post('/:projectId/tasks/:taskId/status',
    param('taskId').isMongoId().withMessage('Id no válido'),
    body('status')
        .notEmpty().withMessage('El estado es obligatorio'),
    handleInputErrors,
    TaskController.updateStatus
)

/**Routes for teams*/
router.get('/:projectId/team',
    TeamMemberController.getProjectTeam
)
router.post('/:projectId/team/find',
    body('email')
        .isEmail().toLowerCase().withMessage('Email no valido'),
    handleInputErrors,
    TeamMemberController.findMemberByEmail
)

router.post('/:projectId/team',
    body('id')
        .isMongoId().withMessage('Id no valido'),
    handleInputErrors,
    TeamMemberController.addMemberById
)

router.delete('/:projectId/team/:userId',
    param('userId')
        .isMongoId().withMessage('Id no valido'),
    handleInputErrors,
    TeamMemberController.removeMemberById
)

/** Routes for Notes  */
router.post('/:projectId/tasks/:taskId/notes',
    body('content')
        .notEmpty().withMessage('El contenido de la nota es obligatorio'),
    handleInputErrors,
    NoteController.createNote
)

router.get('/:projectId/tasks/:taskId/notes',
    NoteController.getTaskNotes
)

router.delete('/:projectId/tasks/:taskId/notes/:noteId',
    param('noteId').isMongoId().withMessage('ID no válido'),
    handleInputErrors,
    NoteController.deleteNote
)
export default router