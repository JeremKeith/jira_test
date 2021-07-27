import { SearchPanel } from "./search-pannel";
import { List } from "./list";
import { useEffect, useState } from "react";
import { cleanObject, useMount, useDebounce } from "../../utils/index";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const debounceParam = useDebounce(param, 200);
  const client = useHttp();
  useEffect(() => {
    client("projects", { data: cleanObject(debounceParam) }).then(setList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceParam]);
  useMount(() => {
    client("users").then(setUsers);
  });
  return (
    <Container>
      <SearchPanel
        users={users}
        param={param}
        setParam={setParam}
      ></SearchPanel>
      <List list={list} users={users}></List>
    </Container>
  );
};
const Container = styled.div`
  padding: 3.2rem;
`;
