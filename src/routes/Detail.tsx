import React from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      medium_cover_image
      language
      rating
      title
      description_intro
      isLiked @client
    }
    suggestions(id: $id) {
      id
      medium_cover_image
    }
  }
`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
`;

const Poster = styled.div<{ bg: string }>`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
`;
interface IMovie {
  id: number;
  title: string;
  rating: number;
  description_intro: string;
  language: string;
  medium_cover_image: string;
  genres: string[];
  isLiked: boolean;
}

interface IData {
  movie: IMovie;
  suggestion: IMovie[];
}
const Detail = () => {
  const { id } = useParams();
  const { loading, data } = useQuery<IData>(GET_MOVIE, {
    variables: { id: id && +id },
  });

  return (
    <Container>
      <Column>
        <Title>
          {loading
            ? "Loading..."
            : `${data?.movie.title} ${data?.movie.isLiked ? "🧡" : "❌"}`}
        </Title>
        <Subtitle>
          {data?.movie.language} · {data?.movie.rating}
        </Subtitle>
        <Description>{data?.movie.description_intro}</Description>
      </Column>
      <Poster bg={data?.movie.medium_cover_image || ""}></Poster>
    </Container>
  );
};

export default Detail;
