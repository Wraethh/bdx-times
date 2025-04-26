import { useSuspenseQuery } from "@tanstack/react-query";
import { ArticleType } from "../../services/types";
import { Link } from "react-router";

type ArticlesFetchType = {
  posts: ArticleType[],
  total: number,
  skip: number,
  limit: number
}

export default function ArticleSearchResults({ searchTerm }: {searchTerm: string}) {
  const fetchArticles = async (searchKey: string): Promise<ArticlesFetchType> => {
    const response = await fetch(`https://dummyjson.com/posts/search?q=${searchKey}&sortBy=views&order=desc`)
    if (!response.ok) throw new Error('Could not fetch articles')
    return response.json();
  }

  const { data } = useSuspenseQuery({ 
    queryKey: ['articles', searchTerm], 
    queryFn: () => fetchArticles(searchTerm),
  })

  if (data.total === 0) return (
    <p>No articles found</p>
  )

  return (
    <ul>
        {data.posts.map(post => (
            <li key={post.id}>
                <Link to={`/articles/${post.id}`}>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                    <p>{post.views}</p>
                    <ul>
                        {post.tags.map(tag => (
                            <li key={tag}>#{tag}</li>
                        ))}
                    </ul>
                </Link>
            </li>
        ))}
    </ul>
  )
}
