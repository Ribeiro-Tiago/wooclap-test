import { BaseMovie } from "../../../types/movies";

export interface Movie extends BaseMovie {
  id: string;
  rating: string;
}

export interface File {
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}
