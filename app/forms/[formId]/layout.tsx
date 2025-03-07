import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="my-5 bg-gray-200 dark:bg-black">
      {children}
    </div>
  );
};

export default layout;
