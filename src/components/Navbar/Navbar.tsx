import { Link, useLocation } from "react-router"
import { useUser } from "../../contexts/User/UserContext"
import styles from "./Navbar.module.css"

export default function Navbar() {
  const { user, logoutUser } = useUser();
  const location = useLocation().pathname.slice(1) || "home";

  const navLinks = [
    {id: "home", title: "Home", link: "/"}, 
    {id: "articles", title: "Posts", link: "/articles"}
  ]

  return (
    <nav className={styles.navbar}>
      <ul>
        {navLinks.map(link => (
          <li key={link.id} className={location === link.id ? styles.active : ""}>
            <Link to={link.link}>{link.title}</Link>
          </li>
        ))}

        { user ? (
          <li className={styles.logged}>
              <img src={user.image} alt={`profile picture of ${user.firstName} ${user.lastName}`} />
              <p>{user.firstName} {user.lastName}</p>
              <button onClick={logoutUser}>Logout</button>
          </li>
        ) : (
          <li className={location === "login" ? styles.active : ""}>
              <Link to="/login">Login</Link> 
          </li>
        )}
      </ul>
    </nav>
  )
}
