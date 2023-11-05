import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube, faInstagram, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

type props = {
    username: string,
    setProfileBox: React.Dispatch<React.SetStateAction<boolean>>,
}
export default function ProfileBox(props: props) {
    return (
        <>
            <div className="post-container">

                <div className='post-child profileBox'>
                    <div className="post-close">
                        <FontAwesomeIcon icon={faXmark} className="close-btn" onClick={() => props.setProfileBox(false)} ></FontAwesomeIcon>
                    </div>
                    <div className="profileBox-child">{props.username}</div>
                    <div className="profileBox-child">
                        <FontAwesomeIcon className="profileIcon" icon={faYoutube} />
                        <input type="text" placeholder="www.youtube.com" />
                    </div>
                    <div className="profileBox-child">
                        <FontAwesomeIcon className="profileIcon" icon={faXTwitter} />
                        <input type="text" placeholder="www.twitter.com" />
                    </div>
                    <div className="profileBox-child">
                        <FontAwesomeIcon className="profileIcon" icon={faInstagram} />
                        <input type="text" placeholder="www.instagram.com" />
                    </div>
                    <div className="profileBox-child">
                        <button >Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}
