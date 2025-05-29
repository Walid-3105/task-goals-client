import React from "react";
import GoalForm from "./GoalForm";
import GoalList from "./GoalList";

const Goals = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-10/12 mx-auto mt-10">
      <GoalForm />
      <GoalList />
    </div>
  );
};

export default Goals;
