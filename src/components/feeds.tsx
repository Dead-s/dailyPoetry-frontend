import { useState } from "react"
import Add_postBtn from "./add_post"
import Content from "./content"
import Post_box from "./post_box"
import Loader from "./loader"
import ProfileBox from "./profileBox"

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

function Feeds(props: props) {
    const [isLoading, setfirst] = useState(false);
    return (
        <>
            <div className={`container`} onClick={() => { props.setDropdown(false) }}>
                {

                    props.showpostbox ?
                        <Post_box setPostbox={props.setPostbox} userId={props.userId} />
                        :
                        isLoading ?
                            <Loader />
                            :
                            props.showProfileBox ?
                                <ProfileBox setProfileBox={props.setProfilebox} username={props.username}/> :
                                <>
                                    {props.srchdUser.length == 0 ?
                                        <>
                                            <Content content="“Giving up smoking is the easiest thing in the world. I know because I’ve done it a thousand times.”" name="Mark Twain" date={"1908-10-22"} />
                                            <Content content="“No man is an island,Entire of itself,Every man is a piece of the continent,A part of the main.
                                        If a clod be washed away by the sea,Europe is the less.
                                        As well as if a promontory were. as if a manor of thy friend’s Or of thine own were:
                                        Any man’s death diminishes me, Because I am involved in mankind,
                                        And therefore never send to know for whom the bell tolls;It tolls for thee.”" name="John Donne" date={"1925-03-19"} />
                                        </> :

                                        props.srchdUser.map((obj) => {
                                            return <Content key={obj["_id"]} content={obj["content"]} date={obj["createdAt"]} name={obj["name"][0]["name"]} />
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