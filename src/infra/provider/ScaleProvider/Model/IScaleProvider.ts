import {fabric} from 'fabric'
export default interface IScaleProvider{
    fit(path:String):Promise<fabric.Canvas|undefined>
    center(path:String):Promise<fabric.Canvas| undefined>
}