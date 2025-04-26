import { useState } from "react";
import { ArticlesFetchType } from "../../services/types";
import { useSuspenseQuery } from "@tanstack/react-query";

import ArticlesList from "../ArticlesList/ArticlesList";
import PaginationSelectionMenu from "../PaginationSelectionMenu/PaginationSelectionMenu";


export default function ArticlesPagination() {
  const [skip, setSkip] = useState<number>(0);
  const limit = 10;

  const fetchArticles = async (skipAmount: number): Promise<ArticlesFetchType> => {
    const response = await fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${skipAmount}&sortBy=views&order=desc`)
    if (!response.ok) throw new Error('Could not fetch articles')
    return response.json();
  }

  const { data } = useSuspenseQuery({ 
    queryKey: ['articles', skip], 
    queryFn: () => fetchArticles(skip),
  })

  const paginationNumbers = Array.from({length: Math.ceil(data.total / limit)}, (_, i) => i)

  const handleClickPrevBtn = (): void => {
    setSkip((prev) => prev <= 0 ? prev : prev - limit)
  }

  const handleClickNumBtn = (num: number): void => {
    setSkip(num * limit)
  }

  const handleClickNextBtn = (): void => {
    setSkip((prev) => prev + limit >= data.total ? prev : prev + limit)
  }

  const disablePrevBtn = skip <= 0;
  const disableNextBtn = skip + limit >= data.total;
  const disableNumBtn = (num: number): boolean => skip / limit === num

  return (
    <>
      <ArticlesList articles={data.posts} />
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
