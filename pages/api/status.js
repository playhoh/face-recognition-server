import {debug, env, initialized, isLocal, recognitions, weightsFolder} from "../../src/runFaceRegognition"

export default async function handler(req, res) {
    res.status(200).send({
        initialized,
        debug,
        recognitions,

        env,
        isLocal,
        weightsFolder
    })
}
