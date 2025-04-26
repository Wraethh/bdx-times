import { useParams } from "react-router"
import { useSuspenseQuery } from "@tanstack/react-query";
import { dummyFetch } from "../../services/utils";
import { ArticleType, CommentType } from "../../services/types";
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
  console.log(user)

  const { data: article }: { data: ArticleType } = useSuspenseQuery({ 
    queryKey: [`article${id}`], 
    queryFn: () => dummyFetch(`https://dummyjson.com/posts/${id}`),
  })
  
  const { data: comments }: { data: CommentsFetchType } = useSuspenseQuery({ 
    queryKey: [`comments${id}`], 
    queryFn: () => dummyFetch(`https://dummyjson.com/posts/${id}/comments`),
  })

  const { data: author }: { data: CustomAuthorType } = useSuspenseQuery({ 
    queryKey: [`author${id}`], 
    queryFn: () => dummyFetch(`https://dummyjson.com/users/${article.userId}?select=firstName,lastName,image`),
  })

  return (
    <>
      <h1>{article.title}</h1>
      <p>
        Written by 
        <span>
          <img src={author.image} alt={`profile picture of ${author.firstName} ${author.lastName}`} /> 
          {author.firstName} {author.lastName}
        </span>
      </p>
      <p>{article.body}</p>
      <ul>
        <li>{article.views}</li>
        <li>{article.reactions.likes}</li>
        <li>{article.reactions.dislikes}</li>
      </ul>
      <h2>Comments ({comments.total})</h2>
      <ul>
        {comments.comments.map((com: CommentType) => (
          <li key={com.id}>
            <p>{com.body}</p>
            <p className={user?.id === com.user.id ? styles.author : undefined}>{com.user.fullName}</p>
            <p>{com.likes}</p>
          </li>
        ))}
      </ul>
    </>
  )
}
