import React from "react";

import "./SearchBar.scss";
import debounce from "../../utils/debounce";

interface Props {
  isFetching: boolean;
  searchMovies: (search: string) => void;
}

export default function SearchBar({ searchMovies, isFetching }: Props) {
  let input: HTMLInputElement;

  const onTriggerSearch = async () => {
    if (isFetching) {
      return;
    }

    searchMovies(input.value);
  };

  const onChange = () => debounce(onTriggerSearch);

  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="Search..."
        onChange={onChange}
        disabled={isFetching}
        ref={(ref) => {
          if (ref) {
            input = ref;
          }
        }}
      />

      <button disabled={isFetching} onClick={onTriggerSearch}>
        Search
      </button>
    </div>
  );
}
