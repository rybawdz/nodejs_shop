import { useRouter } from 'next/navigation';

function NavBar() {
    const router = useRouter();

    // Subpages data
    const subpages = {
        "Home": "/",
        "Profile": "/profile",
        "Contact": "/contact"
    };

    // handleClick function to handle click events and navigate
    const handleClick = (href) => (e) => {
        e.preventDefault();
        router.push(href);
    };

    // Generate content for subpageBox elements
    var content = [];
    for (const key in subpages) {
        content.push(
            <div key={key} className='subpageBox' onClick={handleClick(subpages[key])}>
                <p>{key}</p>
            </div>
        );
    }

    // Render NavBar component
    return (
        <div className='navbarBox'>
            <div className='logoBox'>
                Logo
            </div>
            <div className='subpagesBox'>
                {content}
            </div>
            <div className="loginSignupBox">
                <div className="loginBox" onClick={handleClick("/login")}>
                    <p>
                        Log In
                    </p>
                </div>
                <div className="signupBox" onClick={handleClick("/signup")}>
                    <p>
                        Sign Up
                    </p>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
