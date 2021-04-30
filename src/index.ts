import "dotenv/config";
import path from "path";
import fs from "fs";
import DiskProvider from "./infra/provider/ImageProvider/Implementation/DiskProvider";
import CanvasProvider from "./infra/provider/ScaleProvider/Implementation/FabricCanvas";
import { fabric } from "fabric";

let disk = new DiskProvider();

interface Circle {
  X: number;
  Y: number;
  Radius: number;
}

let resizeImage = async () => {
  let canvasP = new CanvasProvider();
  let pathString = path.resolve(__dirname, "..", "img");
  await Promise.all(
    fs.readdirSync(pathString).map(async (file) => {
      if (file.match(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/)) {
        let filePath = path.resolve(pathString, file);
        let centeredCanvas = await canvasP.center(filePath);
        let fitCanvas = await canvasP.fit(filePath);

        if (centeredCanvas)
          disk.saveFile(
            file.replace(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/, "") + "-centered",
            centeredCanvas
          );
        if (fitCanvas)
          disk.saveFile(
            file.replace(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/, "") + "-fit",
            fitCanvas
          );
      }
    })
  );
};

let generateBackGroundFixo = async () => {
  let background = new fabric.Canvas("c", {
    backgroundColor: "#480202",
    width: 1080,
    height: 1080,
  });

  disk.saveFile("backgroundFixo", background);
};

let generate = async () => {
  let canvasWidth = 1080;
  let canvasHeight = 1080;
  let canvas = new fabric.Canvas("c", {
    backgroundColor: "#480202",
    width: canvasWidth,
    height: canvasHeight,
  });

  let Indexes: any = [];

  let calculateIndex = (Radius: number, width: number, height: number) => {
    console.log(Radius);
    if (Indexes.length > 0) {
      let arrayX: number[] = [];
      let arrayY: number[] = [];
      for (let i = 0; i < 1000; i++) {
        arrayX.push(Math.floor(Math.random() * (width - 0) + 0));
        arrayY.push(Math.floor(Math.random() * (height - 0) + 0));
      }

      while (arrayX.length > 0 && arrayY.length > 0) {
        let X = arrayX.pop();
        let Y = arrayY.pop();

        let bbb = Indexes.filter((oldCircle: Circle) =>
          returnPointsArea(
            oldCircle.X,
            oldCircle.Y,
            oldCircle.Radius,
            X,
            Y,
            Radius
          )
        );

        if (bbb.length === 0) {
          Indexes.push({ X, Radius, Y });
          console.log(Indexes);
          return [X, Y];
        }
      }
    }
    let X = Math.floor(Math.random() * (width - 0) + 0);
    let Y = Math.floor(Math.random() * (height - 0) + 0);
    Indexes.push({ X, Radius, Y });
    console.log(Indexes);
    return [X, Y];
  };

  for (let i = 0; i < 20; i++) {
    let radius = Math.random() * (100 - 60) + 60;
    let indexes = calculateIndex(radius, canvasWidth, canvasHeight);
    let circle = new fabric.Circle({
      radius: radius,
      fill: "#ffff",
      stroke: "#ffff",
      left: indexes[0],
      top: indexes[1],
    });

    canvas.add(circle);
  }

  canvas.renderAll();

  disk.saveFile("backgroundFixoBolas", canvas);
};

let generateCloud = async () => {
  let canvasWidth = 1080;
  let canvasHeight = 1080;
  let canvas = new fabric.Canvas("c", {
    backgroundColor: "#480202",
    width: canvasWidth,
    height: canvasHeight,
  });

  for (let i = 0; i < 1000; i++) {
    let radius = Math.random() + (100 - 80) + 80;
    let circle = new fabric.Circle({
      radius: radius,
      fill: "#ffff",
      stroke: "#ffff",
      left: Math.random() * (canvasWidth - 2 * radius - radius) + radius / 2,
      top: Math.random() * (canvasHeight - 2 * radius - radius) + radius / 2,
    });

    canvas.add(circle);
  }

  canvas.renderAll();

  disk.saveFile("backgroundCloud", canvas);
};

generate();

function returnPointsArea(
  oldX: number,
  oldY: number,
  oldRadius: number,
  newX: number | undefined,
  newY: number | undefined,
  newRadius: number
) {
   if (newX === undefined || newY === undefined) return true;
   if (newX === oldX && newY === oldY) return true;

//   let distance = Math.pow(newX + oldX, 2) + Math.pow(newY + oldY, 2);

//   if (distance + newRadius <= Math.pow(oldRadius, 2)) return true;

//   return false;

     let XmPoint = ((oldX ) + newX) / 2;
     let YmPoint = (oldY + newY) / 2
     let XTouch = false
     let YTouch = false



     if(newY != oldY){
        
        if(newX > oldX){
            let height = newY - oldY
            let width = newX - oldX
            let distance = Math.sqrt(Math.pow(height,2) + Math.pow(width,2))

            if(distance <= oldRadius + newRadius)
                return true

            
        }else{
            let height = oldY - newY
            let width = oldX - newX

            let distance = Math.sqrt(Math.pow(height,2) + Math.pow(width,2))

            if(distance <= oldRadius + newRadius)
                return true
        }

     }else{
        if((newX > oldX)){
            if(newX - newRadius <= XmPoint)
              XTouch= true
        }else{
            if(newX + newRadius >= XmPoint)
            XTouch= true
        }
     }
     

   
   return YTouch && XTouch

  // let area = Math.PI* Math.pow(oldRadius,2)
  // let circle = (oldX * oldY) + area

  // let newArea = Math.PI* Math.pow(newRadius,2)
  // let newCircle =

  // if(newX === oldX && newY===oldY)
  //     return true

  // if(newX > oldX){

  //     if((newX - newRadius) <= (oldX+oldRadius)){
  //         return  true
  //     }

  // }else{
  //     if((newX + newRadius) >= oldX - oldRadius){
  //        return  true
  //     }
  // }

  // if(newY > oldY){
  //     if((newY - newRadius) <=  (oldY+oldRadius)){
  //         return  true
  //     }
  // }else{
  //     if((newY + newRadius) >= (oldY - oldRadius))
  //         return  true;
  // }

  // let oldArea =  Math.PI* Math.pow(oldRadius,2)
  // let newArea =  Math.PI* Math.pow(newRadius,2)

  // let oldPosition = (oldY + oldX) + oldArea
  // let newPosition = (newY + newX) + newArea

  // if(newPosition === oldPosition)
  //     return true

  //return false;
}
