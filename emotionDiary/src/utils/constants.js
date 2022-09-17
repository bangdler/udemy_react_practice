export const STORAGE_KEY = 'diaryData';
export const PUBLIC_URL = process.env.PUBLIC_URL || '';
export const LATEST = 'latest';
export const OLDEST = 'oldest';
export const EMOTION_LIST = [
  { emotion_id: 1, emotion_img: PUBLIC_URL + `/assets/emotion1.png`, emotion_description: '완전 좋음' },
  { emotion_id: 2, emotion_img: PUBLIC_URL + `/assets/emotion2.png`, emotion_description: '좋음' },
  { emotion_id: 3, emotion_img: PUBLIC_URL + `/assets/emotion3.png`, emotion_description: '보통' },
  { emotion_id: 4, emotion_img: PUBLIC_URL + `/assets/emotion4.png`, emotion_description: '나쁨' },
  { emotion_id: 5, emotion_img: PUBLIC_URL + `/assets/emotion5.png`, emotion_description: '완전 나쁨' },
];
