import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { dummyFetch } from "../../services/utils";
import { ArticlesFetchType } from "../../services/types";

import ArticlesList from "../ArticlesList/ArticlesList";
import PaginationSelectionMenu from "../PaginationSelectionMenu/PaginationSelectionMenu";


export default function ArticlesPagination() {
  const [skip, setSkip] = useState<number>(0);
  const limit = 10;

  const { data: articles }: { data: ArticlesFetchType} = useSuspenseQuery({ 
    queryKey: ['articles', skip], 
    queryFn: () => dummyFetch(`https://dummyjson.com/posts?limit=${limit}&skip=${skip}&sortBy=views&order=desc`),
  })

  const paginationNumbers = Array.from({length: Math.ceil(articles.total / limit)}, (_, i) => i)

  const handleClickPrevBtn = (): void => {
    setSkip((prev) => prev <= 0 ? prev : prev - limit)
  }

  const handleClickNumBtn = (num: number): void => {
    setSkip(num * limit)
  }

  const handleClickNextBtn = (): void => {
    setSkip((prev) => prev + limit >= articles.total ? prev : prev + limit)
  }

  const disablePrevBtn = skip <= 0;
  const disableNextBtn = skip + limit >= articles.total;
  const disableNumBtn = (num: number): boolean => skip / limit === num

  return (
    <>
      <ArticlesList articles={articles.posts} />
      <PaginationSelectionMenu 
        handleClickPrevBtn={handleClickPrevBtn} 
        handleClickNumBtn={handleClickNumBtn}
        handleClickNextBtn={handleClickNextBtn}
        disablePrevBtn={disablePrevBtn}
        disableNumBtn={disableNumBtn} 
        disableNextBtn={disableNextBtn} 
        paginationNumbers={paginationNumbers}
      />
    </>
  )
}
