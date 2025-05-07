import { Suspense } from "react";
// import styles from "./Articles.module.css"
import ArticlesPagination from "../../components/ArticlesPagination/ArticlesPagination";

export default function Articles() {
  return (
    <>
      <h1>Articles</h1>
      <Suspense fallback={<p>Writing articles...</p>}>
        <ArticlesPagination />
      </Suspense>
    </>
  )
}
