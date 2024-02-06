import NavBar from "../components/navbar";
import "../styles/main.css";

export default function Page() {
    return( 
    <>
      <NavBar/>
      <div className="content">
        <section>
            <h1>Contact Us - Zesty Shrek Factory</h1>
            <h2>Get in Ogre Touch</h2>
            
            <p>Welcome to our Swamp! If you have any inquiries, suggestions, or just want to share your love for Shrek, feel free to reach out to us:</p>

            <p><strong>Email:</strong> info@shrekmerch.com</p>

            <p><strong>Phone:</strong> 1-800-OGRE-LUV</p>

            <p>Donkey says: "We're always ready to chat, especially if it involves onions and ogre-sized adventures!"</p>
        </section>

        <footer>
            Disclaimer: All communications will be handled with the utmost Ogre professionalism. No Farquaad-level shenanigans, we promise! 🌟
        </footer>
      </div>
    </>
    )
  }