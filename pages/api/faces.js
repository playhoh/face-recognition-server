import {findFaces} from "../../src/runFaceRegognition"

export default async function handler(req, res) {
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
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.status(200).send({...faces, ok: !error, error})
}
