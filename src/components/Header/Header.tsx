import { Link } from "react-router";
import Navbar from "../Navbar/Navbar";
import styles from "./Header.module.css";
import useScreenWidth from "../../hooks/useScreenWidth";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

export default function Header() {
  const screenWidth = useScreenWidth();

  return (
    <header className={styles.header}>
        <Link to={"/"}>Random Times</Link>
        {screenWidth > 670 ?
          <Navbar /> :
          <BurgerMenu />
        }
    </header>
  )
}
