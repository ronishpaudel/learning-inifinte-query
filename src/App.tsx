import { useInfiniteQuery } from "@tanstack/react-query";
import { Item, fetchItems } from "./api/item";

export default function App() {
  const {
    data,
    error,
    status,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["items"],
    queryFn: ({ pageParam = 0 }) => fetchItems({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  return (
    <div className="flex flex-col gap-2">
      {status === "pending" ? (
        <div>Loading...</div>
      ) : status === "error" ? (
        <div>{(error as Error).message}</div>
      ) : (
        <>
          {data?.pages.map((page, index) => (
            <div key={index} className="flex flex-col gap-2">
              {page.data.map((item: Item) => (
                <div key={item.id} className="rounded-md bg-grayscale-700 p-4">
                  {item.name}
                </div>
              ))}
            </div>
          ))}
          {hasNextPage && (
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="rounded-md bg-blue-500 p-2 text-white mt-4"
            >
              {isFetchingNextPage ? "Loading..." : "Show More"}
            </button>
          )}
        </>
      )}
    </div>
  );
}
