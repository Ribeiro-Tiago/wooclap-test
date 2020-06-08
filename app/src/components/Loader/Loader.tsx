import React from "react";

import "./Loader.scss";

interface Props {
  isFetching: boolean;
}

export default function Loader({ isFetching }: Props) {
  const renderLoader = () => {
    if (!isFetching) {
      return <></>;
    }

    return (
      <div className="loader-wrapper">
        <div className="loader"></div>
      </div>
    );
  };

  return renderLoader();
}
