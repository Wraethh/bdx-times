import { useSuspenseQuery } from "@tanstack/react-query";
import { ArticlesFetchType, FetchError } from "../../services/types";
import ArticlesList from "../ArticlesList/ArticlesList";
import { dummyFetch } from "../../services/utils";

export default function ArticleSearchResults({ searchTerm }: {searchTerm: string}) {
  const { data: articles, error }: { data: ArticlesFetchType, error: FetchError | null } = useSuspenseQuery({ 
    queryKey: ['search', searchTerm], 
    queryFn: () => dummyFetch(`https://dummyjson.com/posts/search?q=${searchTerm}&sortBy=views&order=desc`),
  })

  if (error) return (
    <p>An error occured, try refreshing the page</p>
  )

  if (articles.total === 0) return (
    <p>No articles found</p>
  )

  return (
    <>
      <p>Results: {articles.total}</p>
      <ArticlesList articles={articles.posts} />
    </>
  )
}
