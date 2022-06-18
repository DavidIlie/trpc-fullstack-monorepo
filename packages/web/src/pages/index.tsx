import React, { useState } from "react";

import { trpc } from "@/lib/trpc";
import { createInputSchema } from "@trpc-monorepo/common";

const Home: React.FC = () => {
   const utils = trpc.useContext();
   const { isLoading, data } = trpc.useQuery(["todo"]);
   const [error, setError] = useState<string | null>(null);

   const params = {
      onSuccess() {
         utils.invalidateQueries(["todo"]);
      },
   };
   const createMutation = trpc.useMutation(["create-todo"], params);
   const updateMutation = trpc.useMutation(["update-todo"], params);
   const deleteMutation = trpc.useMutation(["delete-todo"], params);

   if (isLoading || !data) return <div className="p-3">Loading...</div>;

   return (
      <div className="p-3">
         <h1 className="font-medium text-3xl">Your todos</h1>
         <div className="my-2" />
         <form
            className="flex gap-2"
            onSubmit={async (e) => {
               setError(null);
               e.preventDefault();
               const val = (e.target as any).input.value;
               if (val === "") return setError("Cannot be empty.");
               const result = createInputSchema.safeParse({ name: val });
               if (!result.success)
                  return setError(result.error.issues[0].message);
               createMutation.mutate({ name: val });
               (e.target as any).input.value = "";
            }}
         >
            <div>
               <input
                  className="bg-gray-100 border-2 p-1 rounded-md"
                  placeholder="todo"
                  name="input"
                  disabled={createMutation.isLoading}
               />
               {(error || createMutation.isError) && (
                  <p className="text-red-500 font-medium">
                     {error || createMutation?.error?.message}
                  </p>
               )}
            </div>
            <button
               type="submit"
               className="bg-red-500 text-white p-1 rounded font-medium px-2 hover:bg-red-600 duration-150 h-[35px] disabled:bg-red-100 disabled:cursor-not-allowed"
               disabled={createMutation.isLoading}
            >
               submit
            </button>
         </form>
         <div className="my-2" />
         <ul className="container max-w-xs">
            {data.todos.map((todo, index) => (
               <div key={index} className="flex justify-between items-center">
                  <li
                     className={`${
                        todo.completed && "line-through"
                     } cursor-pointer w-fit`}
                     onClick={async () =>
                        await updateMutation.mutateAsync({
                           id: todo.id,
                           state: !todo.completed,
                        })
                     }
                     title="Toggle complete status"
                  >
                     {todo.name}
                  </li>
                  <button
                     onClick={async () =>
                        await deleteMutation.mutateAsync({ id: todo.id })
                     }
                  >
                     delete
                  </button>
               </div>
            ))}
            {data.todos.length === 0 && (
               <div className="text-gray-600 font-medium">No todos</div>
            )}
         </ul>
      </div>
   );
};

export default Home;
