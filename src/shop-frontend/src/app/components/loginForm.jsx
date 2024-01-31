function LoginForm({ submit }) {
    return (
        <div className="loginFormBox">
            <form method="post" onSubmit={submit}>
                <div className="usernameBox">
                    <p>Email</p>
                    <input type="email" className="username" name="email" />
                </div>
                <div className="passwordBox">
                    <p>password</p>
                    <input type="password" className="password" name="password" />
                </div>
                <div className="submitBox">
                    <input type="submit" value="Log In" />
                </div>
            </form>
        </div>
    )
}

export default LoginForm;