import React, { Fragment, useEffect, useState } from "react";

const MovieSummary: React.FC<{ movieId: string }> = (props) => {
  const [movieData, setMovieData] = useState<{}>();
  useEffect(() => {
    fetch(`http://www.omdbapi.com/?apikey=64e502b&i=${props.movieId}&plot=full`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        return response.json();
      })
      .then((data) => {
        // console.log(data);
        setMovieData(data);
      });
  });
  useEffect(() => {});

  return (
    <Fragment>
      <div></div>
    </Fragment>
  );
};

export default MovieSummary;
