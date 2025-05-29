import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxios from "@/Hooks/useAxios";
import { AuthContext } from "@/Provider/AuthProvider";

export default function GoalForm() {
  const axiosPublic = useAxios();
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    email: user.email,
    title: "",
    description: "",
    category: "weekly",
    deadline: "",
  });

  const { mutate: addGoal } = useMutation({
    mutationFn: (newGoal) => axiosPublic.post("/goals", newGoal),
    onSuccess: () => {
      queryClient.invalidateQueries(["goals"]);
      toast.success("Goal added successfully");
      setFormData({
        email: user.email,
        title: "",
        description: "",
        category: "weekly",
        deadline: "",
      });
    },
    onError: () => {
      toast.error("Failed to add goal");
    },
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    addGoal(formData);
  };

  return (
    <form
      className="flex flex-col gap-2 border-2 border-gray-50  rounded-md p-4 w-10/12 space-y-3 max-h-fit"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold">Add a new goal</h2>
      <input
        className="border border-gray-300 rounded-md p-2"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <input
        className="border border-gray-300 rounded-md p-2"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />
      <select
        className="border border-gray-300 rounded-md p-2"
        name="category"
        value={formData.category}
        onChange={handleChange}
      >
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
      <input
        className="border border-gray-300 rounded-md p-2"
        name="deadline"
        type="date"
        value={formData.deadline}
        onChange={handleChange}
      />
      <button className="bg-blue-500 text-white rounded-md p-2" type="submit">
        Add Goal
      </button>
    </form>
  );
}
