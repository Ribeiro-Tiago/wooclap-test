import React, { useEffect, useState } from "react";

import "./Alert.scss";

interface Props {
  fetchErr: string;
}

export default function Alert({ fetchErr }: Props) {
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    if (!!fetchErr) {
      toggleVisibility();
    }
  }, [fetchErr]);

  const toggleVisibility = () => {
    setVisible(true);

    setTimeout(() => setVisible(false), 5000);
  };

  const renderAlert = () => {
    if (!isVisible) {
      return <></>;
    }

    return (
      <div className="alert">
        <span>{fetchErr}</span>
      </div>
    );
  };

  return renderAlert();
}
