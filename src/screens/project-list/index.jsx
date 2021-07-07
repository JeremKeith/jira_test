import { SearchPanel } from "./search-pannel"
import { List } from "./list"
import { useEffect, useState } from "react"
import { cleanObject } from "../../utils"
import * as qs from "qs"
const apiURL = process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const [users, setUsers] = useState([])
  const [list, setList] = useState([])
  useEffect(() => {
    console.log(qs.stringify(param));
    fetch(`${apiURL}/projects?${qs.stringify(cleanObject(param))}`).then(res => res.json())
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