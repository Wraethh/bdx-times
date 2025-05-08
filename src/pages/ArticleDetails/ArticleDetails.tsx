import { useParams } from "react-router"
import { useSuspenseQuery } from "@tanstack/react-query";
import { dummyFetch } from "../../services/utils";
import { ArticleType, CommentType, FetchError } from "../../services/types";
import { useUser } from "../../contexts/User/UserContext";
import styles from "./ArticleDetails.module.css"

type CommentsFetchType = {
  comments: CommentType[],
  total: number,
  skip: number,
  limit: number
}

type CustomAuthorType = {
  id: number,
  firstName: string,
  lastName: string,
  image: string,
}

export default function ArticleDetails() {
  const { id } = useParams();
  const { user } = useUser();

  const { data: article, error: articleError }: { data: ArticleType, error: FetchError | null } = useSuspenseQuery({ 
    queryKey: [`article${id}`], 
    queryFn: () => dummyFetch(`https://dummyjson.com/posts/${id}`),
  })
  
  const { data: comments, error: commentsError }: { data: CommentsFetchType, error: FetchError | null } = useSuspenseQuery({ 
    queryKey: [`comments${id}`], 
    queryFn: () => dummyFetch(`https://dummyjson.com/posts/${id}/comments`),
  })

  const { data: author, error: authorError }: { data: CustomAuthorType, error: FetchError | null } = useSuspenseQuery({ 
    queryKey: [`author${id}`], 
    queryFn: () => dummyFetch(`https://dummyjson.com/users/${article.userId}?select=firstName,lastName,image`),
  })

  if (articleError || commentsError || authorError) {
    return (
      <p>An error occured, try refreshing the page</p>
    )
  }

  return (
    <>
      <article className={styles.article}>
        <h1>{article.title}</h1>
        <p className={styles.author}>
          Written by 
          <span>
            <img src={author.image} alt={`profile picture of ${author.firstName} ${author.lastName}`} /> 
            {author.firstName} {author.lastName}
          </span>
        </p>
        <p>{article.body}</p>
        <ul className={styles.otherInfos}>
          <li>{article.views} views</li>
          <li>{article.reactions.likes} likes</li>
          <li>{article.reactions.dislikes} dislikes</li>
        </ul>
      </article>

      <div className={styles.comments}>
        <h2>Comments ({comments.total})</h2>
        <ul>
          {comments.comments.map((com: CommentType) => (
            <li key={com.id}>
              <p>« {com.body} »</p>
              <div>
                <p className={user?.id === com.user.id ? styles.connectedUser : undefined}>{com.user.fullName}</p>
                <p>{com.likes} likes</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
