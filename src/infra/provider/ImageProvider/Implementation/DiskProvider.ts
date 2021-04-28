 import { Canvas } from "fabric/fabric-impl";
 import IImageProvider from "../Model/IImageProvider";
 import {Image} from 'canvas'
 import fs from 'fs';
 import path from 'path'
 export default class DiskProvider implements IImageProvider{
  
     async saveFile(name: string, file: Canvas): Promise<void> {
        
         let url = file.toDataURL({
             format: 'image/png',
      
         })
      
         let image = new Image();
         image.src = url
         let imageUrl = image.src.replace(/^data:image\/\w+;base64,/,"")
      
      
         await fs.writeFile(path.resolve(__dirname,"..","..","..","..","..","temp",`${name}.jpg`),Buffer.from(imageUrl,'base64'),(error) =>{
             if(error)
             console.log(`Error: ${error}`)
         })
     }
 }