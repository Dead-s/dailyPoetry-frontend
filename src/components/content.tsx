// import { useState } from "react"

import axios from "axios";

type props = {
    content: string,
    name: string,
    date: string,
    username: string,
    setSocialBox: React.Dispatch<React.SetStateAction<boolean>>,
    setSocialUsername: React.Dispatch<React.SetStateAction<string>>,
}


function setDate(date: string) {
    const uploadDate = new Date(date).toDateString().split(" ");
    return `${uploadDate[3]} ${uploadDate[1]} ${uploadDate[2]}`;
}

function getSocials(name: string) {
    axios.get('http://localhost:5000/socials', { params: { username: name } }).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    })
}

function Content(props: props) {
    function showProfile() {
        props.setSocialBox(true);
        props.setSocialUsername(props.username);
        getSocials(props.username);

        // props.setProfileBox(true);
    }
    // const [content, setcontent] = useState('')
    return (
        <div className="content-container">
            {/* <textarea onChange={(e) => { setcontent(e.target.value); console.log(content) }} /> */}
            <pre className="content">
                {props.content}
            </pre>
            <div className="author">by&nbsp;
                <span onClick={() => showProfile()}>
                    {props.name}
                </span>
                ,&nbsp;&nbsp;{setDate(props.date)}</div>
        </div>
    )
}

export default Content