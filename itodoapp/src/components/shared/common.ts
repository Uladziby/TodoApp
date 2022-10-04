/** @format */

import { typeOfFilters } from "./interfaces";

export function defineTypeOfFiltering(typeOfFilter: string) {
  switch (typeOfFilter) {
    case "Done":
      return typeOfFilters.completed;
    case "In Progress":
      return typeOfFilters.progress;
    case "Favourite":
      return typeOfFilters.favourite;
    default:
      return "";
  }
}
