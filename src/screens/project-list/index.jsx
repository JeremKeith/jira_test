import { SearchPanel } from "./search-pannel"
import { List } from "./list"
export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const [list, setList] = useState([])
  useEffect(() => {
    fetch('').then(
      res => {
        if (res.ok) {
          setList(res.json())
        }
      }
    )
  }, [param])
  return <div>
    <SearchPannel param={param} setParam={setParam}></SearchPannel>
    <List list={list}></List>
  </div>
}