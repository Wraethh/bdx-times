import { FormEvent, Suspense, useState } from "react"
import styles from "./Home.module.css"
import ArticleSearchResults from "../../components/ArticleSearchResults/ArticleSearchResults"

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string | null>(null);

  const saveSearchTerm = (e: FormEvent): void => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      searchbar: { value: string };
    };
    if (target.searchbar.value) setSearchTerm(target.searchbar.value)
  }

  return (
    <>
      <h1>Home</h1>
      <form onSubmit={saveSearchTerm} className={styles.articleSearchForm}>
        <label htmlFor="searchbar">Search for an article :</label>
        <div>
          <input type="text" name="searchbar" id="searchbar" aria-label="searchbar" />
          <button>Search</button>
        </div>
      </form>
      {searchTerm && (
        <Suspense fallback={<p>Loading...</p>}>
          <ArticleSearchResults searchTerm={searchTerm} />
        </Suspense>
      )}
    </>
  )
}
