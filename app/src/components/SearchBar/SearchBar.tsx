import React, { useState } from "react";

import "./SearchBar.scss";
import debounce from "../../utils/debounce";
import { searchMovies } from "../../services/api";

export default function SearchBar() {
  const [isFetching, setFetching] = useState<boolean>(false);
  let input: HTMLInputElement;

  const onTriggerSearch = async () => {
    if (isFetching) {
      return;
    }

    setFetching(true);
    await searchMovies(input.value).finally(() => setFetching(false));
  };

  const onChange = () => debounce(onTriggerSearch);

  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="Search..."
        onChange={onChange}
        ref={(ref) => {
          if (ref) {
            input = ref;
          }
        }}
      />

      <button onClick={onTriggerSearch}>Search</button>
    </div>
  );
}
