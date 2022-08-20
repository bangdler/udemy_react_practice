
const DiaryItem = ({ author, contents, emotion, createdDate}) => {
    return  <div className="DiaryItem">
        <div className="info">
            <span>작성자: {author} | 감정 점수: {emotion}점</span>
            <div className="date">작성일자: {new Date(createdDate).toLocaleString()}</div>
        </div>
        <div className="contents">내용: {contents}</div>
    </div>
}

export default DiaryItem