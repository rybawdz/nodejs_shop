// Import dependencies
import { useRouter } from 'next/navigation';

// NavBar component
function NavBar() {
    // useRouter hook
    const router = useRouter();

    // Subpages data
    const subpages = {
        "Home": "/",
        "Profile": "/profile",
        "Basket": "/basket"
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
            <div key={key} className='subpageBox'>
                <a href={subpages[key]} onClick={handleClick(subpages[key])}>{key}</a>
            </div>
        );
    }

    // Styles for NavBar
    const navbarStyle = {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: "150px",
    };

    navbarStyle.logoBox = {
        outline: "2px solid blue",
    };

    navbarStyle.subpagesBox = {
        display: "flex",
        outline: "2px solid green",
    };

    navbarStyle.subpageBox = {
        outline: "2px solid black",
    };

    navbarStyle.loginSignupBox = {
        display: "flex",
        outline: "2px solid red",
    };

    // Render NavBar component
    return (
        <div className='navbarBox' style={navbarStyle}>
            <div className='logoBox' style={navbarStyle.logoBox}>
                Logo
            </div>
            <div className='subpagesBox' style={navbarStyle.subpagesBox}>
                {content}
            </div>
            <div className="loginSignupBox" style={navbarStyle.loginSignupBox}>
                <div className="loginBox">
                    <a href="/login" onClick={handleClick("/login")}>Log In</a>
                </div>
                <div className="signupBox">
                    <a href="/signup" onClick={handleClick("/signup")}>Sign Up</a>
                </div>
            </div>
        </div>
    );
}

// Export NavBar component
export default NavBar;
