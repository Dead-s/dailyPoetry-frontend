import Add_postBtn from "./add_post"
import Content from "./content"
import Post_box from "./post_box"
import Loader from "./loader"
import ProfileBox from "./profileBox"
import { useState } from "react"
import SocialBox from "./socialBox"

type props = {
    userId: string,
    setDropdown: React.Dispatch<React.SetStateAction<boolean>>,
    dropdownState: boolean,
    srchdUser: Array<object>,
    setPostbox: React.Dispatch<React.SetStateAction<boolean>>,
    showpostbox: boolean,
    setProfilebox: React.Dispatch<React.SetStateAction<boolean>>,
    showProfileBox: boolean,
    username: string
}
type searchUserData = {
    _id: string;
    content: string;
    createdAt: string;
    name: {
        name: string
    };
}
function Feeds(props: props) {
    const [socialUsername, setSocialUsername] = useState("");
    const [socialBox, setSocialBox] = useState(false);
    return (
        <>
            <div className={`container`} onClick={() => { props.setDropdown(false) }}>
                {

                    props.showpostbox ?
                        <Post_box setPostbox={props.setPostbox} userId={props.userId} />
                        :
                        props.showProfileBox ?
                            <ProfileBox setProfileBox={props.setProfilebox} username={props.username} userId={props.userId} /> :
                            socialBox ?
                                <SocialBox username={socialUsername} setSocialBox={setSocialBox} />
                                :
                                <>
                                    {props.srchdUser.length == 0 ?
                                        <Loader />
                                        :
                                        props.srchdUser.map((obj: searchUserData) => {
                                            return <Content setSocialUsername={setSocialUsername} setSocialBox={setSocialBox} username={obj["name"][0]["name"]}
                                                key={obj["_id"]} content={obj["content"]} date={obj["createdAt"]} name={obj["name"][0]["name"]} />
                                        })
                                    }
                                </>
                }
                {(props.username !== "" && !props.showpostbox) && <Add_postBtn setPostbox={props.setPostbox} />}
            </div >
        </>
    )
}

export default Feeds