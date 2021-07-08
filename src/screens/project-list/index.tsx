import { SearchPanel } from "./search-pannel";
import { List } from "./list";
import { useEffect, useState } from "react";
import { cleanObject, useMount, useDebounce } from "../../utils/index";
import * as qs from "qs";
const apiURL = process.env.REACT_APP_API_URL;
export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const debounceParam = useDebounce(param, 200);
  useEffect(() => {
    fetch(`${apiURL}/projects?${qs.stringify(cleanObject(debounceParam))}`)
      .then((res) => res.json())
      .then((data) => setList(data));
  }, [debounceParam]);
  useMount(() => {
    fetch(`${apiURL}/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  });
  return (
    <div>
      <SearchPanel
        users={users}
        param={param}
        setParam={setParam}
      ></SearchPanel>
      <List list={list} users={users}></List>
    </div>
  );
};
