import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube, faInstagram, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faXmark, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/ReactToastify.min.css"
import axios from "axios";

type props = {
    username: string,
    setProfileBox: React.Dispatch<React.SetStateAction<boolean>>,
    userId: string
}
export default function ProfileBox(props: props) {
    const [socials, setSocials] = useState({
        youtube: "",
        twitterX: "",
        instagram: ""
    });
    useEffect(() => {
        axios.get('https://daily-poetry-backend.vercel.app/socials', { params: { id: props.userId } }).then(res => {
            console.log(res);
            setSocials(crnt => {
                return { ...crnt, youtube: res.data.youtube, instagram: res.data.instagram, twitterX: res.data.twitterX };
            })
        }).catch(err => {
            console.log(err);
        })
    }, [])

    function updateSocials() {
        axios.post('https://daily-poetry-backend.vercel.app/socials', { id: props.userId, socials: socials }).then(res => {
            console.log(res);
            toast.success("Socials Updated!", { position: toast.POSITION.TOP_CENTER, theme: "dark", autoClose: 1000 })
        }).catch(err => {
            console.log(err);
        })
    }
    return (
        <>
            <ToastContainer></ToastContainer>
            <div className="post-container">
                <div className='post-child profileBox'>
                    <div className="post-close">
                        <FontAwesomeIcon icon={faXmark} className="close-btn" onClick={() => props.setProfileBox(false)} ></FontAwesomeIcon>
                    </div>
                    <div className="profileBox-child userDiv">
                        <FontAwesomeIcon icon={faCircleUser} className="userIcon" ></FontAwesomeIcon>
                        <span>{props.username}</span>
                    </div>
                    <div className="selfProfile-div">
                        <div className="profileBox-child">
                            <FontAwesomeIcon className="profileIcon" icon={faYoutube} />
                            <input type="text" value={socials.youtube} onChange={(e) => {
                                setSocials(crnt => {
                                    return { ...crnt, youtube: e.target.value }
                                })
                            }} placeholder="https://youtube.com" />
                        </div>
                        <div className="profileBox-child">
                            <FontAwesomeIcon className="profileIcon" icon={faXTwitter} />
                            <input type="text" value={socials.twitterX} onChange={(e) => {
                                setSocials(crnt => {
                                    return { ...crnt, twitterX: e.target.value }
                                })
                            }}
                                placeholder="https://twitter.com" />
                        </div>
                        <div className="profileBox-child">
                            <FontAwesomeIcon className="profileIcon" icon={faInstagram} />
                            <input type="text" value={socials.instagram} onChange={(e) => {
                                setSocials(crnt => {
                                    return { ...crnt, instagram: e.target.value }
                                })
                            }}
                                placeholder="https://instagram.com" />
                        </div>
                        <div className="profileBox-child">
                            <button onClick={updateSocials}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
