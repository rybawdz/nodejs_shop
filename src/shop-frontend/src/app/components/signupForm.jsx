function SignupForm({ onSubmit }) {
    return (
        <div className="singupFormBox">
            <form method="post" onSubmit={onSubmit}>
                <div className="emailBox">
                    <p>e-mail</p>
                    <input type="text" className="email" />
                </div>
                <div className="usernameBox">
                    <p>Username</p>
                    <input type="text" className="username" />
                </div>
                <div className="passwordBox">
                    <p>Password</p>
                    <input type="password" className="password" />
                </div>
                <div className="passwordRepeatBox">
                    <p>Repeat password</p>
                    <input type="password" className="passwordRepeat" />
                </div>
                <div className="submitBox">
                    <input type="submit" value="Sign Up" />
                </div>
            </form>
        </div>
    )
}

export default SignupForm;