type PaginationSelectionMenuPropsType = {
    handleClickPrevBtn: () => void, 
    handleClickNumBtn: (num: number) => void,
    handleClickNextBtn: () => void,
    disablePrevBtn: boolean,
    disableNumBtn: (num: number) => boolean, 
    disableNextBtn: boolean, 
    paginationNumbers: number[],
}

export default function PaginationSelectionMenu({
    handleClickPrevBtn, 
    handleClickNumBtn, 
    handleClickNextBtn, 
    disablePrevBtn, 
    disableNumBtn, 
    disableNextBtn, 
    paginationNumbers
}: PaginationSelectionMenuPropsType) {
    
  return (
    <ul>
        <li>
          <button onClick={handleClickPrevBtn} disabled={disablePrevBtn} aria-label="previous">{"<"}</button>
        </li>
        {paginationNumbers.map((num: number) => (
          <li key={num}>
            <button onClick={() => handleClickNumBtn(num)} disabled={disableNumBtn(num)}>
              {num + 1}
            </button>
          </li>
        ))}
        <li>
          <button onClick={handleClickNextBtn} disabled={disableNextBtn} aria-label="next">{">"}</button>
        </li>
    </ul>
  )
}
