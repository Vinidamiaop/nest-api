import { Injectable } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { editFileName } from 'src/utils/editFileName';
import { filterFiles } from 'src/utils/filterFiles';
import * as path from 'path';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      storage: diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: editFileName,
      }),
      fileFilter: filterFiles,
      limits: { fileSize: 5 * 1000000 },
    };
  }
}
