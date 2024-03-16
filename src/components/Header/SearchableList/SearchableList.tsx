import { useLocation, useNavigate } from "react-router";
import { useGetCharacterSearchQuery } from "../../../store/api/dataOneApi";
import s from "./searchableList.module.scss";
import { useDebounce } from "../../../hooks/useDebounce";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getEmail } from "../../../store/slices/userSlice";
import { addHistoryItem } from "../../../store/slices/historySlice";

export const SearchableList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userEmail = useAppSelector(getEmail);
  const queryParam = new URLSearchParams(location.search).get("query");
  const [value, setValue] = useState<string>(queryParam || "");
  const debouncedSearchTerm = useDebounce(value, 300);
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useGetCharacterSearchQuery(debouncedSearchTerm || "", {
    skip: value.trim().length <= 0,
  });

  const characterName = data && data.docs ? data.docs : [];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(addHistoryItem({ search: value, email: userEmail }));
    setIsOpen(false);
    navigate(`/searchResult?${value}`);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setIsOpen(true);
  };

  const handleClick = (_name: string, id: string) => {
    navigate(`/card/${id}`);
    setIsOpen(false);
  };

  return (
    <>
      <form className={s.searchableList} onSubmit={handleSubmit}>
        <label className={s.searchableListWrapper}>
          <button className={s.searchableListLabel} type="submit">
            search
          </button>
          <input
            className={s.searchableListInput}
            type="text"
            placeholder="enter name"
            value={value || ""}
            onChange={handleChange}
            onFocus={() => setIsOpen(true)}
          />
        </label>
      </form>
      <div
        className={`${s.searchListPopup} ${
          isOpen ? s.searchListPopupOpen : ""
        }`}
      >
        {characterName.length ? (
          <ul className={s.searchListChar}>
            {characterName.map((item) => (
              <li
                className={s.searchListItem}
                key={item.id}
                onClick={() => handleClick(item.name, item.id)}
              >
                <p className={s.searchListTitle}>{item.name}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className={s.searchListTitle}>Nothing was found</p>
        )}
      </div>
    </>
  );
};