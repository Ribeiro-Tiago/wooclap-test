import React, { useState } from "react";

import "./ImageUploader.scss";

interface Props {
  initialSrc: string;
  setFileUploadRef: (ref: HTMLInputElement) => void;
  err?: string;
}

export default function MovieDetails({
  err,
  initialSrc,
  setFileUploadRef,
}: Props) {
  const [src, setSrc] = useState(initialSrc);
  let uploader: HTMLInputElement;

  const onClick = () => uploader.click();

  const onFileChange = (ev: any) => {
    const file = ev.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => setSrc(e.target?.result as string);

    reader.readAsDataURL(file);
  };

  const setRef = (ref: any) => {
    if (ref) {
      setFileUploadRef(ref);
      uploader = ref;
    }
  };

  return (
    <div className={`img-uploader ${!!err ? "has-error" : ""}`}>
      <input
        type="file"
        name="file"
        ref={setRef}
        onChange={onFileChange}
        accept="image/x-png,image/jpeg"
      />
      <img src={src} alt="Poster" onClick={onClick} />
      {!!err && <span className="err">{err}</span>}
    </div>
  );
}
