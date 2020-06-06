import React from "react";

import "./Home.scss";
import { SearchBar } from "../../components";

export default function Home() {
  return (
    <div className="home">
      <h1>Movie Catalog</h1>

      <SearchBar />
    </div>
  );
}
