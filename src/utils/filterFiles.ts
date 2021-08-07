export function filterFiles(req, file: Express.Multer.File, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Apenas imagens são permitidas'), false);
  }

  cb(null, true);
}
