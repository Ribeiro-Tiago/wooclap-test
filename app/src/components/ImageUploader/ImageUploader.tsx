import React, { useState } from "react";

import "./ImageUploader.scss";
import { File } from "../../types";

interface Props {
  initialSrc: string;
  onChange: (file: File) => void;
  err: string;
}

export default function MovieDetails({ initialSrc, onChange, err }: Props) {
  const [src, setSrc] = useState(initialSrc);
  let uploader: HTMLInputElement;

  const onClick = () => uploader.click();

  const onFileChange = (ev: any) => {
    const file = ev.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setSrc(e.target?.result as string);
      onChange(file);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className={`img-uploader ${!!err ? "has-error" : ""}`}>
      <input
        type="file"
        name="file"
        ref={(ref) => ref && (uploader = ref)}
        onChange={onFileChange}
        accept="image/x-png,image/jpeg"
      />
      <img src={src} alt="Poster" onClick={onClick} />;
      {!!err && <span className="err">{err}</span>}
    </div>
  );
}
