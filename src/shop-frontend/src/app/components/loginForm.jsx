function LoginForm({ action }) {
    return (
        <div className="loginFormBox">
            <form method="post" action={action}>
                <div className="usernameBox">
                    <p>Username</p>
                    <input type="text" className="username" />
                </div>
                <div className="passwordBox">
                    <p>Passoword</p>
                    <input type="password" className="password" />
                </div>
                <div className="submitBox">
                    <input type="submit" value="Log In" />
                </div>
            </form>
        </div>
    )
}

export default LoginForm;