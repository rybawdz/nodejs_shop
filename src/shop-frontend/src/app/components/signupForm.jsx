function SignupForm({ submit }) {
    return (
        <div className="singupFormBox">
            <form method="post" onSubmit={submit}>
                <div className="emailBox">
                    <p>e-mail</p>
                    <input type="email" name="email" className="email" />
                </div>
                <div className="passwordBox">
                    <p>Password</p>
                    <input type="password" name="password" className="password" />
                </div>
                <div className="passwordRepeatBox">
                    <p>Confirm password</p>
                    <input type="password" name="confirmpwd" className="repeatpwd" />
                </div>
                <div className="submitBox">
                    <input type="submit" value="Sign Up" />
                </div>
            </form>
        </div>
    )
}

export default SignupForm;