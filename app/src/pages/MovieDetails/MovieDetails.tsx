import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import "./MovieDetails.scss";
import { Movie } from "../../types";
import { FormItem } from "../../components";

interface Props {
  movie: Movie;
  isFetching: boolean;
}

type Form = {
  rating: string;
  releaseDate: string;
  genre: string;
  name: string;
};

const formatDateForInput = (date?: Date) => {
  const addLeadZero = (num: number) => `0${num}`.substr(-2);
  const d = !!date ? new Date(date) : new Date();

  return `${d.getFullYear()}-${addLeadZero(d.getMonth() + 1)}-${addLeadZero(
    d.getDate(),
  )}`;
};

export default function MovieDetails({ movie }: Props) {
  const { id } = useParams();
  const history = useHistory();
  const [isEditable, setEditable] = useState<boolean>(id === "-1");
  const [formData, setFormData] = useState<Form>({
    name: movie?.name,
    releaseDate: formatDateForInput(movie?.releaseDate),
    genre: movie?.genre,
    rating: movie?.ratings.toString(),
  });

  const goBack = () => history.push("/");

  const onFormChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const onSubmit = (ev: React.MouseEvent) => {
    ev.preventDefault();
  };

  const renderTitle = () => {
    return <h1>{!movie ? "Create new movie" : "Movie Details"}</h1>;
  };

  const renderForm = () => {
    return (
      <form>
        <img
          src={movie ? movie.img : `/assets/imgs/placeholder.jpg`}
          alt="Poster"
        />

        <FormItem
          elemKey="name"
          isDisabled={!isEditable}
          label="Name"
          onChange={onFormChange}
          value={formData.name}
        />

        <FormItem
          elemKey="releaseDate"
          label="Release date"
          isDisabled={!isEditable}
          value={formData.releaseDate}
          onChange={onFormChange}
          inputType="date"
        />

        <FormItem
          elemKey="rating"
          label="Rating"
          isDisabled={!isEditable}
          value={formData.rating}
          onChange={onFormChange}
        />

        <FormItem
          elemKey="genre"
          label="Genre"
          isDisabled={!isEditable}
          value={formData.genre}
          onChange={onFormChange}
        />

        <div className="buttonWrapper">
          {isEditable && (
            <button type="submit" onClick={onSubmit}>
              Submit
            </button>
          )}

          <button type="button" onClick={goBack}>
            Back
          </button>
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
