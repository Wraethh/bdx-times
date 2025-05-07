import { Link } from "react-router";
import { ArticleType } from "../../services/types";
import styles from "./ArticlesList.module.css"

export default function ArticlesList({articles}: {articles: ArticleType[]}) {
  return (
    <ul className={styles.articlesList}>
        {articles.map(post => (
            <li key={post.id}>
                <Link to={`/articles/${post.id}`}>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                    <p>{post.views} views</p>
                    <ul className={styles.hashtagList}>
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
