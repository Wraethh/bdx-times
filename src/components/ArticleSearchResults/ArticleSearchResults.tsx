import { useSuspenseQuery } from "@tanstack/react-query";
import { ArticlesFetchType } from "../../services/types";
import ArticlesList from "../ArticlesList/ArticlesList";

export default function ArticleSearchResults({ searchTerm }: {searchTerm: string}) {
  const searchForArticles = async (searchKey: string): Promise<ArticlesFetchType> => {
    const response = await fetch(`https://dummyjson.com/posts/search?q=${searchKey}&sortBy=views&order=desc`)
    if (!response.ok) throw new Error('Could not fetch articles')
    return response.json();
  }

  const { data } = useSuspenseQuery({ 
    queryKey: ['search', searchTerm], 
    queryFn: () => searchForArticles(searchTerm),
  })

  if (data.total === 0) return (
    <p>No articles found</p>
  )

  return (
    <ArticlesList articles={data.posts} />
  )
}
