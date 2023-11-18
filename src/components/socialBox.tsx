import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube, faInstagram, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faXmark, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";


type props = {
    username: string,
    setSocialBox: React.Dispatch<React.SetStateAction<boolean>>,
}

function SocialBox(props: props) {
    const [socials, setSocials] = useState({
        youtube: "",
        twitterX: "",
        instagram: ""
    });
    useEffect(() => {
        axios.get('http://localhost:5000/socials', { params: { username: props.username } }).then(res => {
            console.log(res);
            setSocials(crnt => {
                return { ...crnt, youtube: res.data.youtube, instagram: res.data.instagram, twitterX: res.data.twitterX };
            })
        }).catch(err => {
            console.log(err);
        })
    }, [])
    return (
        <div className="post-container">

            <div className='post-child profileBox'>
                <div className="post-close">
                    <FontAwesomeIcon icon={faXmark} className="close-btn" onClick={() => props.setSocialBox(false)} ></FontAwesomeIcon>
                </div>
                <div className="profileBox-child userDiv">
                    <FontAwesomeIcon icon={faCircleUser} className="userIcon" ></FontAwesomeIcon>
                    <span>{props.username}</span>
                </div>
                <div className="profileBox-child redirect-div">
                    <a href={socials.youtube} target="_blank" className="hyperLinkIcon">
                        <FontAwesomeIcon className="profileIcon hyperLinkIcon" icon={faYoutube} />
                    </a>
                    <a href={socials.twitterX} target="_blank" className="hyperLinkIcon">
                        <FontAwesomeIcon className="profileIcon hyperLinkIcon" icon={faXTwitter} />
                    </a>
                    <a href={socials.instagram} target="_blank" className="hyperLinkIcon">
                        <FontAwesomeIcon className="profileIcon hyperLinkIcon" icon={faInstagram} />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default SocialBox