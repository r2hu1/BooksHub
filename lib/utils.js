import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const getHomepageFeed = async () => {
  const data = await fetch("https://www.googleapis.com/books/v1/volumes?q=*");
  const json = await data.json();
  return json;
};
export const getDetailsById = async ({ id }) => {
  const data = await fetch("https://www.googleapis.com/books/v1/volumes/" + id);
  const json = await data.json();
  return json;
};

export const getByQuery = async ({ query }) => {
  const data = await fetch("https://www.googleapis.com/books/v1/volumes?q=" + query);
  const json = await data.json();
  return json;
};