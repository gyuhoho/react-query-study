import { useInfiniteQuery } from "@tanstack/react-query";

import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQuery({
    queryKey: [ "sw-species" ],
    queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    getNextPageParam: (lastPage) => lastPage.next || undefined
  })

  if(isLoading) { return <div className="loading">Loading...</div> }

  if(isError) { return <div>Error...{error.toString()}</div> }

  return (
    <>
      <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
        {
          data.pages.map(pageData => {
            return pageData.results.map(species => {
                    return (
                      <Species 
                        name={species.name}
                        language={species.language}
                        averageLifespan={species.average_lifespan}
                      />
                    )
                  })
          })
        }
      </InfiniteScroll>
      { isFetching && <div className="loading">Loading...</div> }
    </>
  )
}
