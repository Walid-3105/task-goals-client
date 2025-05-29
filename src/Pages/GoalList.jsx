import useAxios from "@/Hooks/useAxios";
import { AuthContext } from "@/Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";

export default function GoalList() {
  const axiosPublic = useAxios();
  const { user } = useContext(AuthContext);
  const email = user?.email;

  const { data: goals = [], refetch } = useQuery({
    queryKey: ["goals"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/goals?email=${email}`);
      return res.data;
    },
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  const deleteGoal = async (id) => {
    await axios.delete(`https://task-goals-server.onrender.com/goals/${id}`);
    refetch();
  };

  return (
    <div className="border border-gray-200 rounded-md">
      <h2 className="text-4xl font-bold text-center p-3">🎯 Your Goals</h2>
      <div className="overflow-y-scroll h-[350px] p-3">
        {goals.map((goal, idx) => (
          <div
            className="border border-gray-200 rounded-md p-4 mb-4 relative"
            key={goal._id}
          >
            <div className="flex justify-between">
              <h3 className="font-bold text-xl text-green-600">
                Goals {idx + 1}
              </h3>
              <h3 className="text-lg  font-semibold">
                {goal.title} ({goal.category})
              </h3>
            </div>
            <p> {goal.description}</p>
            <p> Deadline: {goal.deadline?.substring(0, 10)}</p>
            <button
              className="absolute -right-3 -top-3 hover:text-red-600"
              onClick={() => deleteGoal(goal._id)}
            >
              <MdDeleteForever size={30} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
