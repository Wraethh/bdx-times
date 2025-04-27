import { useRef, useState } from "react";
import { Link } from "react-router";
import { useUser } from "../../contexts/User/UserContext";
import styles from "./BurgerMenu.module.css";
import bookOpen from "../../assets/book-open.svg"
import bookClosed from "../../assets/book-closed.svg"

export default function BurgerMenu() {
    const [isClosing, setIsClosing] = useState<boolean>(false);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const { user, logoutUser } = useUser();

    const navLinks = [
        {title: "Home", link: "/"}, 
        {title: "Posts", link: "/articles"}
    ]

    const closeModal = (): void => {
        if (!dialogRef.current) return;
        setIsClosing(true)
        setTimeout(() => {
            setIsClosing(false)
            dialogRef.current?.close()
        }, 500)
    }

    return (
        <nav className={styles.burger}>
            <button className={styles.openMenu} onClick={() => dialogRef.current?.showModal()} aria-label="open navigation menu">
                <img src={bookOpen} alt="" />
            </button>

            <dialog ref={dialogRef} onClick={(e) => {if (e.target === dialogRef.current) closeModal()}} className={isClosing ? styles.closeModal : ""}>
                <ul>
                    <li className={styles.closeMenu}>
                        <button onClick={closeModal} aria-label="close navigation menu">
                            <img src={bookClosed} alt="" />
                        </button>
                    </li>

                    {navLinks.map(link => (
                    <li key={link.title}>
                        <Link to={link.link} onClick={closeModal}>{link.title}</Link>
                    </li>
                    ))}

                    { user ? (
                        <li className={styles.logged}>
                            <img src={user.image} alt={`profile picture of ${user.firstName} ${user.lastName}`} />
                            <p>{user.firstName} {user.lastName}</p>
                            <button onClick={logoutUser}>Logout</button>
                        </li>
                    ) : (
                        <li>
                            <Link to="/login" onClick={closeModal}>Login</Link> 
                        </li>
                    )}
                </ul>
            </dialog>
        </nav>
      )
}
