import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResultDto } from 'src/shared/dtos/result.dto';
import { CreateImageDto } from '../dtos/image/create-image.dto';
import { ImageService } from '../services/image.service';

@Controller('/v1/images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get()
  async find() {
    try {
      const images = await this.imageService.get();
      return new ResultDto(null, true, images, null);
    } catch (error) {
      return new HttpException(
        new ResultDto(
          'Não foi possível listar as imagens',
          false,
          null,
          error.message,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  @Get('/:id')
  async findOne(@Param('id') id) {
    try {
      const images = await this.imageService.getOne(id);
      return new ResultDto(null, true, images, null);
    } catch (error) {
      return new HttpException(
        new ResultDto(
          'Não foi possível listar as imagens',
          false,
          null,
          error.message,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() model: CreateImageDto,
  ) {
    try {
      const url = await this.imageService.create({
        url: file.filename,
        filename: file.filename,
        title: model.title,
      });
      return new ResultDto('Imagem enviada com sucesso.', true, url, null);
    } catch (error) {
      return new HttpException(
        new ResultDto(
          'Não foi possível fazer o upload da imagem',
          false,
          null,
          error.message,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete('/:id')
  async delete(@Param('id') id) {
    try {
      await this.imageService.delete(id);
      return new ResultDto('Imagem excluída com sucesso.', true, null, null);
    } catch (error) {
      return new HttpException(
        new ResultDto(
          'Não foi possível excluir a imagem',
          false,
          null,
          error.message,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
