import crypto from "crypto";
import multer from "multer";
import { resolve } from "path";

export default {
  upload(folder: string): Record<string, unknown> {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, "..", "..", folder),
        filename: (req, file, callback) => {
          const fileHash = crypto.randomBytes(16).toString("hex");
          const fileName = `${fileHash}_${file.originalname}`;

          return callback(null, fileName);
        },
      }),
    };
  },
};
