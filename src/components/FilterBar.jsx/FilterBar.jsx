import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopics } from "../../../api";
import "./FilterBar.css"

const FilterBar = () => {

  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics().then(({ topics }) => {
      setTopics(topics);
    }, []);
  });

  return (
    <ul className="filter-bar">
        {topics.map(topic => {
            return <li key={topic.slug}>
                <Link to={`/topic/${topic.slug}`}>{topic.slug}</Link>
                </li>
        })}
    </ul>
  )
};

export default FilterBar;