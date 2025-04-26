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
    <div className={styles.home}>
      <h1>Home</h1>
      <form onSubmit={saveSearchTerm}>
        <input type="text" name="searchbar" aria-label="searchbar" />
        <button>Search</button>
      </form>
      {searchTerm && (
        <Suspense fallback={<p>Loading...</p>}>
          <ArticleSearchResults searchTerm={searchTerm} />
        </Suspense>
      )}
    </div>
  )
}
