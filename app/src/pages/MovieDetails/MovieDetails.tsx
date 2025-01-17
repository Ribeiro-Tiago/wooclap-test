import React, { useState, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

import "./MovieDetails.scss";
import { Movie } from "../../types";
import { FormItem, ImageUploader } from "../../components";
import { Form, FormErrors } from "../../types/form";
import { formatDateForInput } from "../../utils/formatters";
import { ROUTES } from "../../selectors/routes";

interface Props extends RouteComponentProps {
  movie: Movie;
  isFetching: boolean;
  isNew: boolean;
  id: string;
  getDetails: (id: string) => Promise<Movie>;
  unselectCurrent: () => void;
  removeMovie: (id: string) => Promise<void>;
  createMovie: (data: FormData) => Promise<void>;
  updateMovie: (id: string, data: FormData) => Promise<void>;
}

function MovieDetails({
  movie,
  isNew,
  history,
  id,
  getDetails,
  unselectCurrent,
  removeMovie,
  createMovie,
  updateMovie,
}: Props) {
  const [isEditable, setEditable] = useState<boolean>(isNew);
  const [formData, setFormData] = useState<Form>({
    name: movie?.name || "",
    releaseDate: formatDateForInput(movie?.releaseDate),
    genre: movie?.genre || "",
    rating: movie?.rating || "",
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
      getDetails(id).then((details) => {
        if (!details) {
          return history.push(ROUTES.HOME);
        }

        setFormData({
          name: details.name,
          releaseDate: formatDateForInput(details.releaseDate),
          genre: details.genre,
          rating: details.rating,
          img: details.img,
        });
      });
    }
  }, [getDetails, isNew, movie, id, history]);

  const goBack = () => {
    unselectCurrent();
    history.push(ROUTES.HOME);
  };

  const isFormValid = () => {
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

    if (isNew && !(fileUploadRef as any).files[0]) {
      errs.file = "Poster is required";
    }

    setErrs(errs);

    return Object.keys(errs).length === 0;
  };

  const onFormChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const onSubmit = async (ev: React.MouseEvent) => {
    ev.preventDefault();

    if (!isFormValid()) {
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

    if (isNew) {
      await createMovie(data);
    } else {
      await updateMovie(id, data);
    }

    goBack();
  };

  const onRemove = async () => {
    await removeMovie(id);
    history.push(ROUTES.HOME);
  };

  const onEdit = (ev: React.MouseEvent) => {
    ev.preventDefault();
    setEditable(!isEditable);
  };

  const renderTitle = () => {
    return <h1>{!movie ? "Create new movie" : "Movie Details"}</h1>;
  };

  const renderSubmitButton = () => {
    if (isEditable) {
      return (
        <button type="submit" onClick={(ev) => onSubmit(ev)}>
          Submit
        </button>
      );
    }

    return (
      <button type="button" onClick={onEdit}>
        Edit movie
      </button>
    );
  };

  const renderForm = () => {
    return (
      <form>
        <ImageUploader
          initialSrc={formData.img}
          setFileUploadRef={(ref) => (fileUploadRef = ref)}
          err={errs.file}
          isDisabled={!isEditable}
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
          inputType="number"
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
            {renderSubmitButton()}

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
