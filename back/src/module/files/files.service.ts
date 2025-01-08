import { Injectable, Inject } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import 'multer';

@Injectable()
export class FilesService {
  constructor(@Inject('cloudinary') private cloudinary) {}

  async uploadImage(file: Express.Multer.File): Promise<any> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({folder: 'hotel-images', resource_type: "auto" }, (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }).end(file.buffer);
    });
  }

  async getImages(query: string) {
    return cloudinary.search
    .expression(query)
    .max_results(10)
    .execute()
    .then((result) => result.resources)
    .catch((error) => {
        throw new Error(`Error al buscar imágenes: ${error.message}`);
    });
  }

  async updateImageMetadata(public_id: string, metadata: Record<string, string>) {
    return cloudinary.uploader.explicit(public_id, {
      type: 'upload',
      context: metadata,
    });
  }

  async replaceImage(file: Express.Multer.File, public_id: string): Promise<UploadApiResponse | UploadApiErrorResponse>  {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          public_id, 
          overwrite: true, 
          folder: 'hotel-images',
        },
        (error, result) => {
          if (error) reject(error);
          resolve(result);
        },
      ).end(file.buffer);
    });
  }
}