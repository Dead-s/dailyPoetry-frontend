import { useEffect, useState } from "react"
import Login from "../components/login"
import Register from "../components/register"

function Auth() {
    const [islogin, setIslogin] = useState(true)
    const [error, setError] = useState(false)
    function validate_form(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
    }
    useEffect(() => {
        setTimeout(() => {
            setError(false)
        }, 1000);
    }, [error])

    return (
        <div className="login-container" 
        // onKeyDown={(e) => { e.key == 'Tab' && setIslogin(!islogin) }}
        >
            <form className={`child ${error ? "error-f" : ""}`} onSubmit={validate_form} >
                <div className="header">
                    <label className={islogin ? 'visible' : ''} onClick={() => { setIslogin(true) }}>Sign In</label>
                    <label className={islogin ? '' : 'visible'} onClick={() => { setIslogin(false) }}>Sign Up</label>
                </div>
                {islogin ? <Login errorVal={error} setError={setError} /> : <Register errorVal={error} setError={setError} />}
            </form>
        </div >
    )
}

export default Auth