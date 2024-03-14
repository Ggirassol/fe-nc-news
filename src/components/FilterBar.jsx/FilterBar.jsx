import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getTopics } from "../../../api";
import "./FilterBar.css"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import RefreshIcon from '@mui/icons-material/Refresh';

const FilterBar = ({ order_by, setOrder_by, sort_by, setSort_by}) => {

  const [topics, setTopics] = useState([]);
  const [isSortByOn, setIsSortByOn] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    getTopics().then(({ topics }) => {
      setTopics(topics)
    })
  }, []);

  useEffect(() => {
    if (order_by && !sort_by) {
      setSearchParams({ order_by })
    } else if (sort_by && !order_by) {
      setSearchParams({ sort_by })
    } else if (order_by && sort_by) {
      setSearchParams({sort_by, order_by})
    }
  }, [sort_by, order_by])

  return (
    <div className="filter-bar">
      <ul className="topics">
        {topics.map((topic) => {
          return (
            <li className="topic" key={topic.slug}>
              <Link to={`/topic/${topic.slug}`}>{topic.slug}</Link>
            </li>
          );
        })}
      </ul>
      <div className="filter-buttons">
        <button className="small-btn" aria-label="reset sorting" onClick={() => {setSort_by(null); setOrder_by(null)}}><RefreshIcon/></button>
        <button className="small-btn" aria-label="ascending order" onClick={() => setOrder_by("asc")}><ArrowDropUpIcon/></button>
        <button className="small-btn" aria-label="descending order" onClick={() => setOrder_by("desc")}><ArrowDropDownIcon/></button>
        <div className="dropdown">
          <button className="dropbtn" onClick={() => setIsSortByOn(true)} onMouseOut={() => setIsSortByOn(false)}>Sort by</button>
          {isSortByOn && (
          <div id="myDropdown" onMouseOver={() => setIsSortByOn(true)}
          onMouseOut={() => setIsSortByOn(false)} className="dropdown-content">
          <button onClick={() => setSort_by("votes")}>Most liked</button>
          <button onClick={() => setSort_by("comment_count")}>Most commented</button>
          <button onClick={() => setSort_by("created_at")}>Most recent</button>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;