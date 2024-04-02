import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/ReactToastify.min.css"
import { useState } from "react";
import axios from 'axios';

type props = {
    userId: string,
    setPostbox: React.Dispatch<React.SetStateAction<boolean>>,
}

function Post_box(props: props) {
    const [content, setContent] = useState('');
    async function validatePost() {
        if (content == '') {
            return console.log('empty');
        }
        // await axios.get('https://daily-poetry-backend.vercel.app/addPost').then((res) => {
        //     console.log(res);
        // }).then((e) => {
        //     console.log(e);
        // })
        await axios.post("https://daily-poetry-backend.vercel.app/addPost", { id: props.userId, content: content }).then((res) => {
            if (res.status == 201) {
                toast.success("Post Added!", { position: toast.POSITION.TOP_CENTER, theme: "dark", autoClose: 1000 })
                setTimeout(() => {
                    props.setPostbox(false);
                }, 1000);
            }
            console.log(res)
        }).catch((e) => {
            console.log(e);
        });
    }
    return (
        <>
            <ToastContainer></ToastContainer>
            <div className="post-container">
                <div className="post-child">
                    <div className="post-close">
                        <FontAwesomeIcon icon={faXmark} className="close-btn" onClick={() => { props.setPostbox(false) }}></FontAwesomeIcon>
                    </div>
                    <div className="post-textarea">
                        <textarea placeholder="Content" value={content}
                            onChange={(e) => { setContent(e.target.value) }}
                        ></textarea>
                    </div>
                    <div className="post-btn">
                        <button onClick={() => { validatePost(); }}>Post</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Post_box;