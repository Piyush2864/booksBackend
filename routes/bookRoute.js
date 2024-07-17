import express from 'express'
import { bookRegister, 
    getAllBooks, 
    updateBooks, 
    updateBookImage,
    deleteBook 
} from '../controller/bookController.js';
import { upload } from '../middleware/multerMiddleware.js'

const router = express.Router();

router.post("/bookRegister",upload.single('image'),bookRegister)
router.get("/allBooks",getAllBooks);
router.route("/updateBook/:id").put(updateBooks)
router.put("/image/:id/image",upload.single('image'),
updateBookImage
),
router.delete("/deleteBook/:id", deleteBook)

export default router;