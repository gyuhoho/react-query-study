import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { PostDetail } from "./PostDetail";
const maxPostPage = 10;

async function fetchPosts(page) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`
  );
  return response.json();
}

export function Posts() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);

  const queryClient = useQueryClient()

  useEffect(() => {
    if(currentPage + 1 < maxPostPage) {

    }
    const nextPage = currentPage + 1;
    queryClient.prefetchQuery({
      queryKey: [ "posts", nextPage ], 
      queryFn: () => fetchPosts(nextPage)
  });
  }, [currentPage, queryClient]);

  const { data, isError, isLoading, error } = useQuery({
    queryKey: [ "posts", currentPage ], 
    queryFn: () => fetchPosts(currentPage), 
    staleTime: 20000,
    keepPreviousData: true
  });
  if (isLoading) return <h3>Loading...</h3>
  if (isError) return (
    <>
      <h3>Something went wrong...</h3>
      <p>{error.toString()}</p>
    </>
  )

  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => setSelectedPost(post)}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button 
          disabled={currentPage === 0 ? true: false}
          onClick={() => {
            return currentPage === 0 ? 0 : setCurrentPage(currentPage - 1)
          }}
        >
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button 
          onClick={() => { 
            return maxPostPage === currentPage + 1 ? 0 : setCurrentPage(currentPage + 1)
          }}
          disabled={maxPostPage === currentPage ? true: false}
        >
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
