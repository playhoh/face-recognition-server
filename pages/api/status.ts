import {debug, env, initialized, isLocal, recognitions, weightsFolder} from "../../src/runFaceRegognition"
import {NextApiRequest, NextApiResponse} from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).send({
        initialized,
        debug,
        recognitions,

        env,
        isLocal,
        weightsFolder
    })
}
