"use client";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { increment, decrement } from "@/redux/features/counterSlice";
import {
  useGetUsersQuery,
  useGetUserByIdQuery,
} from "@/redux/services/userApi";

function HomePage() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  const { data, error, isLoading, isFetching } = useGetUsersQuery(null);
  if (isLoading || isFetching) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  return (
    <>
      <h1 className="text-center text-2-xl">total: {count}</h1>
      <div className="flex justify-center mt-5 mb-5 gap-x-2">
        <button
          className="px-3 py-2 bg-green-500 rounded-md"
          onClick={() => {
            dispatch(increment());
          }}
        >
          Increment
        </button>
        <br />
        <button
          className="px-3 py-2 bg-blue-500 rounded-md"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
      <div className="grid grid-cols-3 gap-3 mx-auto">
        {data?.map((user) => (
          <div className="p-4 bg-zinc-800" key={user.name}>
            <p>{user.name}</p>
            <p>{user.username}</p>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </>
  );
}
export default HomePage;
