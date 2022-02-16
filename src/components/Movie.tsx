import { gql, useMutation } from "@apollo/client";
import React, { FormEvent, MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LIKE_MOVIE = gql`
  mutation likeMovie($id: Int!) {
    toggleLikeMovie(id: $id, isLiked: $isLiked) @client
  }
`;

const Container = styled.div`
  height: 400px;
  border-radius: 7px;
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background-color: transparent;
`;
const Poster = styled.div<{ bg: string }>`
  background-image: url(${(props) => props.bg});
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center center;
  border-radius: 7px;
`;
interface IMovie {
  id: number;
  medium_cover_image: string;
  isLiked: string;
}
const Movie = ({ id, medium_cover_image, isLiked }: IMovie) => {
  const [toggleLikeMovie] = useMutation(LIKE_MOVIE, {
    variables: { id: id, isLiked },
  });

  const toggleMovie = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (isLiked) {
      return null;
    } else {
      toggleLikeMovie();
    }
  };
  return (
    <Container>
      <Link to={`/${id}`}>
        <Poster bg={medium_cover_image} />
      </Link>
      <button onClick={toggleLikeMovie as MouseEventHandler<HTMLButtonElement>}>
        {isLiked ? "Unlike" : "Like"}
      </button>
    </Container>
  );
};

export default Movie;
