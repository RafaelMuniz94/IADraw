import { Canvas } from "fabric/fabric-impl";
import {fabric} from 'fabric'
import IScaleProvider from "../Model/IScaleProvider";

export default class FabricCanvas implements IScaleProvider {


 async fit(path: string): Promise<Canvas|undefined> {
    let canvas: Canvas|undefined = undefined;
     let canvasConstruction =(path: string) => new Promise((resolve,reject) =>{
         fabric.util.loadImage("file://" + path,(img) =>{
             resolve(img)
         })
     })
  
     await canvasConstruction(path).then(
        (img) =>{
            let imag = img as HTMLImageElement
            if (imag === null) {
                return;
              }
 
              let canvasWidth = 1080;
              let canvasHeight = 1350;
 
              canvas = new fabric.Canvas("c", {
                width: canvasWidth,
                height: canvasHeight,
              });
 
              let image = new fabric.Image(imag);
 
              if (!image) {
                return;
              }
 
              image.set({
                scaleX: canvasWidth / imag.width,
                scaleY: canvasHeight / imag.height,
                top: 0,
                left: 0,
                originX: "left",
                originY: "top",
              });
 
              canvas.setBackgroundImage(image, canvas.renderAll.bind(canvas));
 
              canvas.renderAll();
 
        }
     );

     return  canvas
   }



  async center(path: string): Promise<Canvas| undefined> {

    let canvas: Canvas | undefined = undefined

        let canvasConstruction =(path: string) =>  new Promise((resolve,reject) =>{
            fabric.util.loadImage("file://" + path, (img) => {
                resolve(img)
            });
        })



        await canvasConstruction(path).then(
            (img) =>{
         
            let imag = img as HTMLImageElement
            if (imag === null) {
              return;
            }
  
            let canvasWidth = 1080;
            let canvasHeight = 1350;
  
            canvas = new fabric.Canvas("c", {
              width: canvasWidth,
              height: canvasHeight,
            });
  
            let image = new fabric.Image(imag);
  
            if (!image) {
              return;
            }
  
            let imageHeight = image.height ? image.height : 1350;
            let imageWidth = image.width ? image.width : 1080;
  
            image.set({
              top: 0,
              left: 0,
            });
  
            let imgRatio = imageWidth / imageHeight;
            let canvasRatio = canvasWidth / canvasHeight;
            if (imgRatio <= canvasRatio) {
           
                image.scaleToHeight(canvasHeight, true);
        
            } else {
              if (imageWidth > canvasWidth) {
                image.scaleToWidth(canvasWidth, true);
              }
            }
  
            canvas.add(image);
            canvas.centerObject(image);
  
            canvas.renderAll();
  
          })

    return canvas;
  }
}
