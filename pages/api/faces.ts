import {findFaces} from "../../src/runFaceRegognition"
import {NextApiRequest, NextApiResponse} from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).send({message: 'Only POST requests allowed'})
        return
    }
    let error = undefined
    let faces = undefined
    try {
        const body = JSON.parse(req.body)
        faces = await findFaces(body.url)
    } catch (e) {
        error = e.toString()
    }
    res.status(200).send({ok: !error, faces, error})
}