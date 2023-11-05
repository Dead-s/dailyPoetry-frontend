import '../App.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

type props = {
    setDropdown: React.Dispatch<React.SetStateAction<boolean>>,
    setProfileBox: React.Dispatch<React.SetStateAction<boolean>>,
    setSrchdUser: React.Dispatch<React.SetStateAction<Array<object>>>,
    dropdownState: boolean,
    username: string
}

function Navbar(props: props) {
    const navigate = useNavigate();
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    };
    function logout() {
        axios.get('http://localhost:5000/login', config).then(res => {
            console.log(res);
            if (res.data.logout) {
                navigate("/login");
            }
        });
    }
    function searchUser(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.value.trim() != "") {
            axios.post('http://localhost:5000/addPost', { name: e.target.value }, config).then(res => {
                console.log(res.data);
                props.setSrchdUser(res.data);
            });
        } else {
            props.setSrchdUser([]);
        }
    }
    return (
        <div className="nav">
            <label className='header-name'>Daily poetry</label>
            <input autoComplete='off' id='inpSearch' type='search' placeholder='🔎 Search' onChange={(e) => searchUser(e)} />
            {props.username !== "" ?
                <label onClick={() => { props.setDropdown(!props.dropdownState); }}><FontAwesomeIcon icon={faUser} style={{ paddingRight: '5px' }}></FontAwesomeIcon>{props.username}</label>
                :
                <label >
                    <Link to='/home/login' style={{ textDecoration: 'none', color: 'black' }}>
                        Sign In
                    </Link>
                </label>
            }
            <div className={`dropdown ${props.dropdownState ? 'dropdown-show' : 'dropdown-hide'}`}>
                <span onClick={() => props.setProfileBox(true)}>Profile</span>
                {/* <span>Posts</span> */}
                <span onClick={logout}>Sign Out</span>
            </div>
        </div>
    )
}

export default Navbar