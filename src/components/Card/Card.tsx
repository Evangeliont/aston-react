import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useGetCharactersQuery } from "../../store/api/dataOneApi";
import s from "./card.module.scss";
import { Pagination } from "../Pagination";

export const Card = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(12);
  const { data, error, isLoading } = useGetCharactersQuery({
    page: currentPage,
    limit: limit,
  });

  const totalPages = data && data.pages ? data.pages : 0;

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const characters = data
    ? data.docs.map((item) => (
        <li key={item.id} className={s.cardItem}>
          <h3>{item.name}</h3>
          <p>Race: {item.race || "Unknown"}</p>
          <p>Gender: {item.gender || "Unknown"}</p>
          <p>Realm: {item.realm || "Unknown"} </p>
          <Link to={`/card/${item.id}`}>
            <button>Add More</button>
          </Link>
        </li>
      ))
    : null;

  return (
    <>
      <ul className={s.card}>
        {isLoading && <div>Loading...</div>}
        {error && null}
        {characters}
      </ul>
      <div>
        <Pagination pageNumbers={pageNumbers} onChangePage={setCurrentPage} />
      </div>
    </>
  );
};

Card.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  race: PropTypes.string,
  gender: PropTypes.string,
  realm: PropTypes.string,
};
