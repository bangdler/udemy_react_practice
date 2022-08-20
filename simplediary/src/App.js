import './App.css';
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

function App() {
  return (
    <div className="App">
      <DiaryEditor />
        <DiaryList diaryList={dummyList}/>
    </div>
  );
}

const dummyList = [
    {id: 1, author: "오주미", contents:"오주미가 오줌을 쌌다.", emotion:3, createdDate: new Date().getTime()}
]

export default App;
