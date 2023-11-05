import { useEffect, useState } from "react"
import Feeds from "../components/feeds"
import Navbar from "../components/navbar"
import axios from "axios"

function Home() {
    const [showdropdown, setShowdropdown] = useState(false);
    const [postbox, setPostbox] = useState(false);
    const [profileBox, setProfileBox] = useState(false);
    const [username, setUsername] = useState('');
    const [userID, setUserID] = useState('');
    const [searchedUser, setSearchedUser] = useState<Array<object>>([]);
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    };
    useEffect(() => {
        axios.get('http://localhost:5000/', config).then(res => {
            if (res.data.auth) {
                setUsername(res.data.name);
                setUserID(res.data.userId);
            }
        }).catch(err => {
            console.log(err);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <Navbar dropdownState={showdropdown} setDropdown={setShowdropdown} username={username} setProfileBox={setProfileBox} setSrchdUser={setSearchedUser} />
            <Feeds userId={userID} dropdownState={showdropdown} setDropdown={setShowdropdown}
                username={username} setPostbox={setPostbox} showpostbox={postbox} srchdUser={searchedUser}
                setProfilebox={setProfileBox} showProfileBox={profileBox} />
        </>
    )
}

export default Home