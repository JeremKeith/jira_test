import { SearchPanel } from "./search-pannel"
import { List } from "./list"
import { useEffect, useState } from "react"
const apiURL = process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const [users, setUsers] = useState([])
  const [list, setList] = useState([])
  useEffect(() => {
    fetch(`${apiURL}/projects?name=${param.name}&personId=${param.personId}`).then(res => res.json())
    .then(data => setList(data))
  }, [param])
  useEffect(() => {
    fetch(`${apiURL}/users`).then(res => res.json())
    .then(data => setUsers(data))
  }, [])
  return <div>
    <SearchPanel users={users} param={param} setParam={setParam}></SearchPanel>
    <List list={list} users={users}></List>
  </div>
}