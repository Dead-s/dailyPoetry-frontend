import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/ReactToastify.min.css"
import { useState } from "react";
import axios from "axios";

type propsType = {
    errorVal: boolean,
    setError: React.Dispatch<React.SetStateAction<boolean>>
}

function Register(props: propsType) {
    const [visible, setVisible] = useState(false)
    const [name, setName] = useState('')
    const [pass, setPass] = useState('')
    const [repass, setRepass] = useState('')
    const [userExists, setuserExists] = useState(false)
    const [errarr, setErrarr] = useState({
        passError: false,
        passError_msg: '',
        repassError: false,
        repassError_msg: '',
        nameError: false,
        nameError_msg: ''
    })
    const usernameRegex = new RegExp('^[a-zA-Z0-9_]{3,}$');
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})");

    function isNull(e: string, property: string) {
        const msg = property + "_msg";
        if (e.trim() == null || e.trim() == "") {
            setErrarr((arr) => {
                return {
                    ...arr, [property]: true, [msg]: 'Required Field',
                }
            })

        } else {
            if (property == "repassError") Repass_validation(e)
            if (property == "passError") Pass_validation(e)
            if (property == "nameError") Name_validation(e)
        }
    }
    function Name_validation(e: string) {
        usernameRegex.test(e) ?
            setErrarr((arr) => {
                return {
                    ...arr, nameError: false, nameError_msg: '',
                }
            })
            :
            setErrarr((arr) => {
                return {
                    ...arr, nameError: true, nameError_msg: 'Username must be at least 3 characters and no special characters are allowed except underscore(_)',
                }
            })
    }
    function Pass_validation(e: string) {
        setPass(e)
        if (!strongRegex.test(e.trim())) {
            setErrarr((arr) => {
                return {
                    ...arr, passError: true, passError_msg: 'Your password must be at least 8 characters, 1 lowercase,1 uppercase and 1 special character',
                }
            })
        } else {
            setErrarr((arr) => {
                return {
                    ...arr, passError: false, passError_msg: '',
                }
            })
        }
    }
    function Repass_validation(e: string) {
        setRepass(e);
        pass !== e ?
            setErrarr((arr) => {
                return {
                    ...arr, repassError: true, repassError_msg: "Password don't match",
                }
            })
            :
            setErrarr((arr) => {
                return {
                    ...arr, repassError: false, repassError_msg: "",
                }
            })
    }
    function validate_fields() {
        isNull(name, "nameError");
        isNull(pass, "passError");
        isNull(repass, "repassError");
        if (name == '' || pass == '' || repass == '' || errarr.nameError || errarr.passError || errarr.repassError) {
            props.setError(true)
        } else {
            Create_user();
        }
    }
    async function Create_user() {
        await axios.post("https://daily-poetry-backend.vercel.app/register", { name: name, password: pass }).then((res) => {
            if (res.status == 201) {
                toast.success("Account created successfully!", { position: toast.POSITION.TOP_CENTER, theme: "dark", autoClose: 1000 })
                console.log(res, 'created')
            }
        }).catch((e) => {
            if (e.response.status == 409) {
                setuserExists(true)
                props.setError(true);
            }
        });
    }

    return (
        <>
            <ToastContainer></ToastContainer>
            <div className="inp">
                <FontAwesomeIcon icon={faUser} className="icon" />
                <input placeholder="username" type="text" value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        isNull(e.target.value, "nameError");
                        setuserExists(false);
                    }}
                />
                <span className="error">{errarr.nameError ? errarr.nameError_msg : userExists ? 'This username is already taken' : ''}</span>
            </div>
            <div className="inp">
                <FontAwesomeIcon icon={faLock} className="icon" />
                <input placeholder="password" type={visible ? 'text' : 'password'}
                    value={pass} autoComplete="on"
                    onChange={(e) => { Pass_validation(e.target.value) }}
                />
                <span className="error">{errarr.passError && errarr.passError_msg}</span>
                <FontAwesomeIcon onClick={() => { setVisible(!visible) }} icon={visible ? faEye : faEyeSlash} className="pass-icon" />
            </div>
            <div className="inp">
                <FontAwesomeIcon icon={faLock} className="icon" />
                <input placeholder="Confirm" type={visible ? 'text' : 'password'}
                    value={repass} autoComplete="on"
                    onChange={(e) => { Repass_validation(e.target.value) }} />
                <span className="error">{errarr.repassError && errarr.repassError_msg}</span>
                <FontAwesomeIcon onClick={() => { setVisible(!visible) }} icon={visible ? faEye : faEyeSlash} className="pass-icon" />
            </div>
            <input type="submit" value={'Register'} onClick={() => { validate_fields(); }} />
        </>
    )
}

export default Register