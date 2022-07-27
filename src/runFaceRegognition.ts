import * as faceapi from 'face-api.js'
import {canvas} from "./env"
import path from 'path'

export type Box = { x: number, y: number, width: number, height: number }

export let initialized = false
export let recognitions = 0
export let debug = false

const faceDetectionNet = faceapi.nets.ssdMobilenetv1
const minConfidence = 0.5

const inputSize = 408
const scoreThreshold = 0.5

function getFaceDetectorOptions(net: faceapi.NeuralNetwork<any>) {
    return net === faceapi.nets.ssdMobilenetv1
        ? new faceapi.SsdMobilenetv1Options({minConfidence})
        : new faceapi.TinyFaceDetectorOptions({inputSize, scoreThreshold})
}

export const faceDetectionOptions = getFaceDetectorOptions(faceDetectionNet)

export const env = process.env.NODE_ENV
export const isLocal = env === "development"

export const weightsFolder = path.join(process.cwd(), 'weights')

export async function init() {
    if (initialized)
        return
    await faceDetectionNet.loadFromDisk(weightsFolder)
    initialized = true
    console.log("initialized net just now")
}

export type Result = {
    width: number,
    height: number,
    faces: Box[]
}

export async function findFaces(url: string): Promise<Result> {
    await init()

    const img = await canvas.loadImage(url)
    // await canvas.loadImage('./images/bbt1.jpg')
    debug && console.log("img", img)
    const canvas2 = new canvas.Canvas(img.width, img.height)
    const ctx = canvas2.getContext('2d')
    ctx.drawImage(img, 0, 0, img.width, img.height)

    const detections = await faceapi.detectAllFaces(canvas2, faceDetectionOptions)
    let results: Box[] = detections.map(x => {
        let box = x.box
        return ({
            x: box.x,
            y: box.y,
            width: box.width,
            height: box.height
        })
    })
    debug && console.log("results", results)
    recognitions++
    return {faces: results, width: img.width, height: img.height}
}

//async function testRun() {
//    const url = "https://c1.scryfall.com/file/scryfall-cards/large/front/2/7/27855a38-a682-4f97-ad22-ac625e86faec.jpg?1631046745"
//    console.log("url", url, await findFaces(url))
//}
