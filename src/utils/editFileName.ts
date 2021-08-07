import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
export function editFileName(req, file: Express.Multer.File, cb) {
  const uniqueName = uuidv4();
  const fileExtName = extname(file.originalname);
  cb(null, `${uniqueName}${fileExtName}`);
}
