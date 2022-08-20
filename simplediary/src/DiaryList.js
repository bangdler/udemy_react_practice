import DiaryItem from "./DiaryItem";

const DiaryList = ({diaryList}) => {

    return <div className="DiaryList">
        <h2>일기리스트</h2>
        <div className="DiaryListContainer">
            <h4>{diaryList.length}개의 일기가 있습니다.</h4>
            {diaryList.map((diary)=> <DiaryItem key={diary.id} {...diary}/>)}
        </div>
    </div>
}

DiaryList.defaultProps = []

export default DiaryList