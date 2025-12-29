'use server'

import { CloudinaryUploadResult } from "@/lib/types"
import { cloudinary } from "./cloudinary"



export async function uploadImageToCloudinary(
    file: File
): Promise<CloudinaryUploadResult> {
    if (!file.type.startsWith("image/")) {
        throw new Error("Invalid file type. Only images are allowed.")
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const uploadResult = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader
            .upload_stream(
                {
                    resource_type: "image",
                },
                (error, result) => {
                    if (error) reject(error)
                    else resolve(result)
                }
            )
            .end(buffer)
    })

    return {
        url: uploadResult.url,
        publicId: uploadResult.public_id,
        secureUrl: uploadResult.secure_url,
        width: uploadResult.width,
        height: uploadResult.height,
        format: uploadResult.format,
        bytes: uploadResult.bytes,
    }
}
