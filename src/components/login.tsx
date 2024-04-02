import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css"

type propsType = {
    errorVal: boolean,
    setError: React.Dispatch<React.SetStateAction<boolean>>
}

function Login(props: propsType) {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const [name, setName] = useState('');
    const [pass, setPass] = useState('');
    const [loginError, setloginError] = useState(false);
    const [remembeme, setRemembeme] = useState(false);
    const [errarr, setErrarr] = useState({
        passError: false,
        passError_msg: '',
        nameError: false,
        nameError_msg: ''
    });

    useEffect(() => {
        axios.get('https://daily-poetry-backend.vercel.app/', config).then(res => {
            if (res.data.auth) {
                navigate("/home");
            }
        }).catch(e => {
            console.log(e)
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    };

    async function validate() {
        if (!loginError) {
            name.trim() == "" ?
                setErrarr((arr) => {
                    return {
                        ...arr, nameError: true, nameError_msg: 'Required Field',
                    }
                })
                :
                setErrarr((arr) => {
                    return {
                        ...arr, nameError: false, nameError_msg: '',
                    }
                });
            pass.trim() == "" ?
                setErrarr((arr) => {
                    return {
                        ...arr, passError: true, passError_msg: 'Required Field',
                    }
                })
                :
                setErrarr((arr) => {
                    return {
                        ...arr, passError: false, passError_msg: '',
                    }
                });
            name == "" || pass == "" ? props.setError(true) : Auth();
        } else {
            props.setError(true)
        }
    }
    async function Auth() {
        if (!errarr.nameError && !errarr.passError) {
            await axios.post("https://daily-poetry-backend.vercel.app/login", { name: name.toLocaleLowerCase(), password: pass, remember: remembeme }, config).then((res) => {
                if (res.status == 200) {
                    toast.success("Logged In", { position: toast.POSITION.TOP_CENTER, theme: "dark", autoClose: 1000 });
                    navigate('/home');
                }
            }).catch((e) => {
                setloginError(true)
                if (e.response.status == 401) {
                    setErrarr((arr) => {
                        return {
                            ...arr, passError: true, passError_msg: 'Invalid password',
                        }
                    })
                    props.setError(true)
                }
                if (e.response.status == 404) {
                    setErrarr((arr) => {
                        return {
                            ...arr, nameError: true, nameError_msg: 'User not found',
                        }
                    })
                    props.setError(true)
                }
            })
        }
    }
    return (
        <>
            <ToastContainer></ToastContainer>
            <div className="inp">
                <FontAwesomeIcon icon={faUser} className="icon" />
                <input placeholder="username" type="text" onChange={(e) => {
                    setName(e.target.value);
                    setErrarr((arr) => {
                        return {
                            ...arr, nameError: false, nameError_msg: '',
                        }
                    });
                    setloginError(false);
                }} value={name} />
                <span className="error">{errarr.nameError && errarr.nameError_msg}</span>
            </div>
            <div className="inp">
                <FontAwesomeIcon icon={faLock} className="icon" />
                <input placeholder="password" type={visible ? 'text' : 'password'}
                    onChange={(e) => {
                        setPass(e.target.value);
                        setErrarr((arr) => {
                            return {
                                ...arr, passError: false, passError_msg: '',
                            }
                        });
                        setloginError(false);
                    }}
                    value={pass} autoComplete="on" />
                <span className="error">{errarr.passError && errarr.passError_msg}</span>
                <FontAwesomeIcon onClick={() => { setVisible(!visible); }} icon={visible ? faEye : faEyeSlash} className="pass-icon" />
            </div>
            <div className="checkbox">
                <input type="checkbox" checked={remembeme} onChange={(e) => { setRemembeme(e.target.checked) }} />Remember me
            </div>
            <input type="submit" value={'Login'} onClick={() => { validate() }} />
            <div className="bottom-div">
                {/* <label>Register</label> */}
                <label>Forgot password?</label>
            </div>
        </>
    )
}

export default Login