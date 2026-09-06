import { Router } from 'express'
import { getUserNotifications, getNotification, createNotification, updateNotificationStatus, deleteNotification } from '../controllers/notification.controller.js'
import { validateSchema } from '../middlewares/validateSchema.js'
import { NotificationSchema, UpdateNotificationStatusSchema } from '../schemas/notification.schema.js'

const router = Router();

router.get('/notifications/:userId', getUserNotifications);

router.get('/notification/:id', getNotification);

router.post('/create-notification', validateSchema(NotificationSchema), createNotification);

router.put('/update-notification-status/:id?', validateSchema(UpdateNotificationStatusSchema), updateNotificationStatus);

router.delete('/delete-notification/:id?', deleteNotification);

export default router;
