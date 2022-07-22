import {init, initialized} from "../../src/runFaceRegognition"
import {NextApiRequest, NextApiResponse} from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let justNow = false
    if (!initialized) {
        await init()
        justNow = true
    }
    res.status(200).send({initialized, justNow})
}