import { useEffect, useState } from 'react';
import { getFromLocalStorage } from '../../helpers/getFromLocalStorage';
import { setToLocalStorage } from '../../helpers/setToLocalStorage';
import { LikeIcon } from './icons/LikeIcon';
import { DislikeIcon } from './icons/DislikeIcon';

export function LikeDislikeSwitcher({ id }: { id: string }) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  useEffect(() => {
    const likedItems: string[] = getFromLocalStorage('likedItem') || [];
    const dislikedItems: string[] = getFromLocalStorage('dislikedItem') || [];

    setLiked(likedItems.includes(id));
    setDisliked(dislikedItems.includes(id));
  }, [id]);

  function handleToggleLike() {
    const likedItems: string[] = getFromLocalStorage('likedItem') || [];
    const dislikedItems: string[] = getFromLocalStorage('dislikedItem') || [];

    if (liked) {
      const updatedLiked = likedItems.filter((item) => item !== id);
      setToLocalStorage('likedItem', updatedLiked);
      setLiked(false);
    } else {
      const updatedLiked = [...likedItems, id];
      setToLocalStorage('likedItem', updatedLiked);
      setLiked(true);
      if (disliked) {
        const updatedDisliked = dislikedItems.filter((item) => item !== id);
        setToLocalStorage('dislikedItem', updatedDisliked);
        setDisliked(false);
      }
    }
  }

  function handleToggleDislike() {
    const likedItems: string[] = getFromLocalStorage('likedItem') || [];
    const dislikedItems: string[] = getFromLocalStorage('dislikedItem') || [];

    if (disliked) {
      const updatedDisliked = dislikedItems.filter((item) => item !== id);
      setToLocalStorage('dislikedItem', updatedDisliked);
      setDisliked(false);
    } else {
      const updatedDisliked = [...dislikedItems, id];
      setToLocalStorage('dislikedItem', updatedDisliked);
      setDisliked(true);
      if (liked) {
        const updatedLiked = likedItems.filter((item) => item !== id);
        setToLocalStorage('likedItem', updatedLiked);
        setLiked(false);
      }
    }
  }

  return (
    <div className="actions__icons">
      <div className="actions__icon" onClick={handleToggleLike}>
        <LikeIcon fill={liked ? 'black' : '#51505e80'} />
      </div>
      <div className="actions__icon" onClick={handleToggleDislike}>
        <DislikeIcon fill={disliked ? 'black' : '#51505e80'} />
      </div>
    </div>
  );
}
