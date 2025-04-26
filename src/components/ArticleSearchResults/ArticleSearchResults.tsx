import { useSuspenseQuery } from "@tanstack/react-query";
import { ArticlesFetchType } from "../../services/types";
import ArticlesList from "../ArticlesList/ArticlesList";
import { dummyFetch } from "../../services/utils";

export default function ArticleSearchResults({ searchTerm }: {searchTerm: string}) {
  const { data: articles }: { data: ArticlesFetchType } = useSuspenseQuery({ 
    queryKey: ['search', searchTerm], 
    queryFn: () => dummyFetch(`https://dummyjson.com/posts/search?q=${searchTerm}&sortBy=views&order=desc`),
  })

  if (articles.total === 0) return (
    <p>No articles found</p>
  )

  return (
    <ArticlesList articles={articles.posts} />
  )
}
