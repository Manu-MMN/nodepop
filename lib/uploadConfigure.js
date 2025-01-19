import multer from "multer"
import path from "node:path"
import fs from 'node:fs'
//declaramos configuración de almacenamiento

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        const rute = path.join(import.meta.dirname, "..", "public", "images")

        if (!fs.existsSync(rute)) {
            fs.mkdirSync(rute, { recursive: true });
        }
        
        callback(null, rute)
    },
    filename: function(req, file, callback) {
        const filename = `image-${Date.now()}-${file.originalname}`
        console.log("esto es el filename",filename)
        callback(null, filename)
    }
})


const upload = multer({
    storage
})

export default upload