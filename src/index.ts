import "dotenv/config";
import path from "path";
import fs from "fs";
import DiskProvider from "./infra/provider/ImageProvider/Implementation/DiskProvider";
import CanvasProvider from "./infra/provider/ScaleProvider/Implementation/FabricCanvas";


let generate = async () => {
  let disk = new DiskProvider();
  let canvasP = new CanvasProvider();
  let pathString = path.resolve(__dirname, "..", "img");
  await Promise.all(
    fs.readdirSync(pathString).map(async (file) => {
      if (file.match(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/)) {
        let filePath = path.resolve(pathString, file);

        let centeredCanvas = await canvasP.center(filePath);

        let fitCanvas = await canvasP.fit(filePath)
        

         if (centeredCanvas)
           disk.saveFile(
             file.replace(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/, "") + "-centered",
             centeredCanvas
           );
        if(fitCanvas)  disk.saveFile(file.replace(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/,"")+"-fit",fitCanvas)
      }

    })
  );
};

generate();
