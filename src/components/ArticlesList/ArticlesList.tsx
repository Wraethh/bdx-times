import { Link } from "react-router";
import { ArticleType } from "../../services/types";

export default function ArticlesList({articles}: {articles: ArticleType[]}) {
  return (
    <ul>
        {articles.map(post => (
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
