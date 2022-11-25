import React, { Fragment, useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";

const MovieSummary: React.FC = (props) => {
  console.log("bangla");
  const loaderData = useLoaderData();
  console.log(loaderData);
  // console.log(params.movieId);

  const [movieData, setMovieData] = useState<{}>();

  return (
    <Fragment>
      Summary
      <div></div>
    </Fragment>
  );
};

export default MovieSummary;

export async function loader(params) {
  console.log(params.params.movieId);
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=64e502b&i=${params.params.movieId}&plot=full`
  );
  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  console.log(response);
  const rj = await response.json();
  return rj;
}
