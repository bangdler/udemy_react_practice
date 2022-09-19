import React from 'react';

export default React.memo(function EmotionItem({ emotion_id, emotion_description, emotion_img, onClick, isSelected }) {
  return (
    <div
      className={['EmotionItem', isSelected ? `EmotionItem_on_${emotion_id}` : 'EmotionItem_off'].join(' ')}
      onClick={() => onClick(emotion_id)}
    >
      <img src={emotion_img} alt={emotion_description} />
      <span>{emotion_description}</span>
    </div>
  );
});
