import styles from "./PaginationSelectionMenu.module.css";

type PaginationSelectionMenuPropsType = {
    handleClickPrevBtn: () => void, 
    handleClickNumBtn: (num: number) => void,
    handleClickNextBtn: () => void,
    disablePrevBtn: boolean,
    disableNumBtn: (num: number) => boolean, 
    disableNextBtn: boolean, 
    paginationNumbers: number[],
    active: number
}

export default function PaginationSelectionMenu({
    handleClickPrevBtn, 
    handleClickNumBtn, 
    handleClickNextBtn, 
    disablePrevBtn, 
    disableNumBtn, 
    disableNextBtn, 
    paginationNumbers,
    active
}: PaginationSelectionMenuPropsType) {
    
  return (
    <div className={styles.paginationMenu}>
      <button onClick={handleClickPrevBtn} disabled={disablePrevBtn} aria-label="previous">{"<"}</button>
      <ul className={styles.numberList}>
          {paginationNumbers.map((num: number) => (
            <li key={num} className={active === num+1 ? styles.active : ""}>
              <button onClick={() => handleClickNumBtn(num)} disabled={disableNumBtn(num)}>
                {num + 1}
              </button>
            </li>
          ))}
      </ul>
      <button onClick={handleClickNextBtn} disabled={disableNextBtn} aria-label="next">{">"}</button>
    </div>
  )
}
