import React from "react";

import "./SearchBar.scss";

export default function SearchBar() {
  return (
    <div className="searchbar">
      <input type="text" placeholder="Search..." />

      <button>Search</button>
    </div>
  );
}
