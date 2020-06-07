export interface Form {
  rating: string;
  releaseDate: string;
  genre: string;
  name: string;
  img: string;
  file?: File;
}

export interface FormErrors {
  genre?: string;
  name?: string;
  rating?: string;
  releaseDate?: string;
  file?: string;
}
