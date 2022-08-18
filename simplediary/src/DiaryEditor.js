import {useState} from "react";

const DiaryEditor = () => {

    const [state, setState] = useState({author: "", contents: "", emotion: 1})

    const handleChange = (e) => {
        setState(prev => ({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }

    const handleSubmit = () => {
        console.log(state)
        alert("저장")
    }

    const emotionNumbers = [1, 2, 3, 4, 5]
    return <div className="DiaryEditor">
        <h2>오늘의 일기</h2>
        <div><input name="author" value={state.author} onChange={handleChange}/></div>
        <div><textarea name="contents" value={state.contents} onChange={handleChange} /></div>
        <div>
            <span>오늘의 감정 점수 : </span>
            <select name="emotion">
                {emotionNumbers.map((num, idx) => <option key={idx} value={num}>{num}</option>)}
            </select>
        </div>
        <div>
            <button onClick={handleSubmit}>일기저장하기</button>
        </div>
    </div>
}

export default DiaryEditor