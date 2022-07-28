import {init, initialized} from "../../src/runFaceRegognition"

export default async function handler(req, res) {
    let justNow = false
    if (!initialized) {
        await init()
        justNow = true
    }
    res.status(200).send({initialized, justNow})
}