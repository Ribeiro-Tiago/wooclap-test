import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

import "./MovieDetails.scss";
import { Movie } from "../../types";
import { FormItem, ImageUploader } from "../../components";
import { Form, FormErrors } from "../../types/form";

interface Props extends RouteComponentProps {
  movie: Movie;
  isFetching: boolean;
  isNew: boolean;
  id: string;
  getDetails: (id: string) => Promise<Movie>;
  unselectCurrent: () => void;
  removeMovie: (id: string) => Promise<void>;
  createMovie: (data: FormData) => Promise<void>;
}

const formatDateForInput = (date?: Date) => {
  const addLeadZero = (num: number) => `0${num}`.substr(-2);
  const d = !!date ? new Date(date) : new Date();

  return `${d.getFullYear()}-${addLeadZero(d.getMonth() + 1)}-${addLeadZero(
    d.getDate(),
  )}`;
};

function MovieDetails({
  movie,
  isNew,
  history,
  id,
  getDetails,
  unselectCurrent,
  removeMovie,
  createMovie,
}: Props) {
  const [isEditable] = useState<boolean>(isNew);
  const [formData, setFormData] = useState<Form>({
    name: movie?.name || "",
    releaseDate: formatDateForInput(movie?.releaseDate),
    genre: movie?.genre || "",
    rating: movie?.rating.toString() || "",
    img: movie ? movie.img : "/assets/imgs/placeholder.jpg",
  });
  const [errs, setErrs] = useState<FormErrors>({
    genre: "",
    name: "",
    rating: "",
    releaseDate: "",
    file: "",
  });
  let fileUploadRef: HTMLInputElement;

  useEffect(() => {
    if (!isNew && !movie) {
      getDetails(id).then((movie) => {
        setFormData({
          name: movie.name,
          releaseDate: formatDateForInput(movie.releaseDate),
          genre: movie.genre,
          rating: movie.rating.toString(),
          img: movie.img,
        });
      });
    }
  }, []);

  const goBack = () => {
    unselectCurrent();
    history.push("/");
  };

  const onFormChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const onSubmit = (ev: React.MouseEvent) => {
    ev.preventDefault();
    const errs: FormErrors = {};

    if (!formData.genre) {
      errs.genre = "Genre is required";
    }

    if (!formData.name) {
      errs.name = "Name is required";
    }

    if (!formData.releaseDate) {
      errs.releaseDate = "Realse date is invalid";
    }

    if (!formData.rating) {
      errs.rating = "Rating is required";
    }

    if (isNew && !formData.file) {
      errs.file = "Poster is required";
    }

    setErrs(errs);

    if (Object.keys(errs).length > 0) {
      return;
    }

    const data = new FormData();
    const file = (fileUploadRef as any).files[0];

    if (file) {
      data.append("file", file);
    }

    data.append("name", formData.name);
    data.append("genre", formData.genre);
    data.append("releaseDate", formData.releaseDate);
    data.append("rating", formData.rating);

    createMovie(data);
  };

  const onRemove = async () => {
    await removeMovie(id);
    history.push("/");
  };

  const renderTitle = () => {
    return <h1>{!movie ? "Create new movie" : "Movie Details"}</h1>;
  };

  const renderForm = () => {
    return (
      <form>
        <ImageUploader
          initialSrc={formData.img}
          setFileUploadRef={(ref) => (fileUploadRef = ref)}
          err={errs.file}
        />

        <FormItem
          elemKey="name"
          isDisabled={!isEditable}
          label="Name"
          onChange={onFormChange}
          value={formData.name}
          err={errs.name}
        />

        <FormItem
          elemKey="releaseDate"
          label="Release date"
          isDisabled={!isEditable}
          value={formData.releaseDate}
          onChange={onFormChange}
          inputType="date"
          err={errs.releaseDate}
        />

        <FormItem
          elemKey="rating"
          label="Rating"
          isDisabled={!isEditable}
          value={formData.rating}
          onChange={onFormChange}
          err={errs.rating}
        />

        <FormItem
          elemKey="genre"
          label="Genre"
          isDisabled={!isEditable}
          value={formData.genre}
          onChange={onFormChange}
          err={errs.genre}
        />

        <div className="buttonWrapper">
          <div>
            {isEditable && (
              <button type="submit" onClick={onSubmit}>
                Submit
              </button>
            )}

            <button type="button" onClick={goBack}>
              Back
            </button>
          </div>

          {!isNew && (
            <button type="button" className="remove" onClick={onRemove}>
              Remove
            </button>
          )}
        </div>
      </form>
    );
  };

  return (
    <div className="details">
      {renderTitle()}

      {renderForm()}
    </div>
  );
}

export default withRouter(MovieDetails);
