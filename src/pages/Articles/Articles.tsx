import { Suspense } from "react";
import ArticlesPagination from "../../components/ArticlesPagination/ArticlesPagination";

export default function Articles() {
  return (
    <>
      <h1 style={{marginBottom: "3rem"}}>Articles</h1>
      <Suspense fallback={<p>Writing articles...</p>}>
        <ArticlesPagination />
      </Suspense>
    </>
  )
}
