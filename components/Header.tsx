import React from "react";
import { ChaiCodeIcon } from "./icons";

export const AppHeader = ({}) => {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-3 min-w-0">
        <ChaiCodeIcon className="w-11 h-11 rounded-full " />
        <div className="min-w-0">
          <h1 className="text-lg sm:text-xl font-bold text-white truncate">
            Persona AI
          </h1>
        </div>
      </div>
    </header>
  );
};
