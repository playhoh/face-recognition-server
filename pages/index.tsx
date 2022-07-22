import * as React from "react"
import Head from "next/head"

const title = "Face detection based on face-api.js"
const img = "https://c1.scryfall.com/file/scryfall-cards/large/front/2/7/27855a38-a682-4f97-ad22-ac625e86faec.jpg?1631046745"

export default function Page() {
    let [x, setX] = React.useState("")
    React.useEffect(() => {
        let url = global["window"]?.location?.href || "<this-url>"
        setX(`fetch("`
            + url + `api/faces", {method:"post",body:JSON.stringify({url:"`
            + img + `"})}).then(x=>x.json()).then(console.log)`)
    }, [])

    return <>
        <Head><title>{title}</title></Head>
        <div>
            <h2>{title}</h2>
            <p>Try it in the JS console (Ctrl+Shift+I).</p>
            <p>It's possible that it may take 10 seconds or so, depending on the image size.</p>
            <pre>
            {x}
            </pre>
            <br/>
            <button onClick={() => {
                navigator.clipboard.writeText(x)
            }}>
                Copy to clipboard
            </button>
        </div>
    </>
}