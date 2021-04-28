import {fabric} from 'fabric';

export default interface IImageProvider{
    saveFile(name:string, file:fabric.Canvas):Promise<void>
        
}