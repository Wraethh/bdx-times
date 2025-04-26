import ArticlesPagination from "../../components/ArticlesPagination/ArticlesPagination";
import styles from "./Articles.module.css"
import { Suspense } from "react";

export default function Articles() {
  return (
    <div className={styles.articles}>
      <h1>Articles</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <ArticlesPagination />
      </Suspense>
    </div>
  )
}
