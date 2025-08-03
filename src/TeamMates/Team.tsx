import React from "react";

type TypeScrap = {
  id: number;
  title: string;
  toggle: "closed" | "open" | "locked";
};

export default function Tog({ id, title, toggle }: TypeScrap) {
  return <h2>Hello!</h2>;
}
