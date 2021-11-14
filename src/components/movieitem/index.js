import React from "react";
import styled from "styled-components";
import * as colors from "../../colors";
import { genres } from "../../constant";
import "./index.scss";
export default class MovieItem extends React.Component {
  state = {
    movieItem: "",
  };

  calculateGeneres = (generesIds) => {
    const generesList = genres.filter((genres) =>
      generesIds.includes(genres.id)
    );
    return generesList.map((item) => item.name).join(" | ");
  };

  render() {
    const { movie } = this.props;
    return (
      // Complete the MovieItem component

      <MovieItemWrapper className="movie_wrapper flex">
        <LeftCont>
          <img
            src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${movie?.poster_path}`}
            alt="movie-img"
            style={{ width: "100%", height: "250px" }}
          />
        </LeftCont>
        <RightCont>
          <MovieHeader className="flex">
            <MovieTitle>{movie?.title}</MovieTitle>
            <MovieRating bg={"yellowishBg"}>{movie?.vote_average}</MovieRating>
          </MovieHeader>
          <MovieSubTitle>
            {this.calculateGeneres(movie.genre_ids)}
          </MovieSubTitle>
          <MovieText className="text">{movie?.overview}</MovieText>
          <PublishDate color={"yellowishBg"}>{movie?.release_date}</PublishDate>
        </RightCont>
      </MovieItemWrapper>
    );
  }
}

const MovieItemWrapper = styled.div`
  position: relative;
  background-color: white;
  border-radius: 3px;
  margin-bottom: 1.5rem;
}
`;

const LeftCont = styled.div`
  display: inline-block;
  width: 35%;
  padding: 20px;
  @media (max-width: 576px) {
    width: 100%;
  }
`;

const RightCont = styled.div`
  display: inline-block;
  width: 65%;
  padding-right: 20px;
  @media (max-width: 576px) {
    width: 100%;
    padding: 0px 20px;
  }
`;

const MovieHeader = styled.div`
  justify-content: space-between;
  align-items: center;
`;

const MovieTitle = styled.h2`
  margin-bottom: 0px;
  font-weight: 900;
  width: 80%;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const MovieRating = styled.h6`
  margin-bottom: 0px;
  padding: 4px 8px;
  border-radius: 6px;
  color: #fff;
  font-size: 14px;
  margin-top: 15px;
  background-color: ${(props) =>
    props.bg === "yellowishBg" ? colors.yellowishBg : "none"};
`;

const MovieSubTitle = styled.span``;

const PublishDate = styled.span`
  position: absolute;
  bottom: 8%;
  font-size: 12px;
  color: ${(props) =>
    props.color === "yellowishBg" ? colors.yellowishBg : "black"};

  @media (max-width: 576px) {
    display: none;
  }
`;

const MovieText = styled.p`
  text-align: justify;
  display: -webkit-box;
  -webkit-line-clamp: 7;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 14px;
  line-height: 18px;
`;
