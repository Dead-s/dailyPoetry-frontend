// import { useState } from "react"

type props = {
    content: string,
    name: string,
    date: string,
}

function setDate(date: string) {
    const uploadDate = new Date(date).toDateString().split(" ");

    return `${uploadDate[3]} ${uploadDate[1]} ${uploadDate[2]}`;
}

function Content(props: props) {
    // const [content, setcontent] = useState('')
    return (
        <div className="content-container">
            {/* <textarea onChange={(e) => { setcontent(e.target.value); console.log(content) }} /> */}
            <pre className="content">
                {props.content}
            </pre>
            <div className="author">by {props.name}, {setDate(props.date)}</div>
        </div>
    )
}

export default Content