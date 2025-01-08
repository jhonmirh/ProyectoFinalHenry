import { ApiBodyOptions } from "@nestjs/swagger"

    export const updateMetadataSchema: ApiBodyOptions = {
        description: 'Actualizar la metadata de una imagen en Cloudinary.',
        schema: {
            type: 'object',
            properties: {
                public_id: {
                    type: 'string',
                },
                metadata: {
                    type: 'object',
                    properties: {
                        descripcion: {
                            type: 'string',
                        },
                        tags: {
                            type: 'string',
                        },
                    },
                    example: {
                        descripcion: 'Nueva descripción de la imagen',
                        tags: 'Tags actualizadas',
          },
        },
    },
  },
}


export const replaceImageSchema: ApiBodyOptions = {
         description: 'Reemplaza una imagen existente en Cloudinary. Solo se permiten imágenes JPEG, PNG, JPG y WEBP con un tamaño máximo de 2 MB.',
         schema: {
           type: 'object',
           properties: {
             public_id: { type: 'string', description: 'El ID público de la imagen que deseas reemplazar.'},
             image: {
               type: 'string',
               format: 'binary', 
               description: 'El archivo de imagen que deseas subir (JPEG, PNG, JPG, WEBP).'
             },
           },
         },
}


export const postImagesSchema: ApiBodyOptions = {
    description: 'Subir una imagen a Cloudinary. Solo se permiten imágenes JPEG, PNG, JPG y WEBP con un tamaño máximo de 2 MB.',
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary', 
        },
      },
    }
}
