import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import { PostsCard } from '../../components/PostsCard/PostsCard';
import type { IPostsCard } from '../../types/interfaces';

export function Favorites() {
  const { data: favorites } = useSelector((state: RootState) => state.favorites);

  const favoritesList = favorites.map((item: IPostsCard) => <PostsCard key={item.id} post={item} />);

  return (
    <div className="catalog">
      <div className="catalog__container _container">
        <div className="catalog__body body">
          <div className="catalog__title title">Favorites</div>
          <div className="catalog__list">{favoritesList}</div>
        </div>
      </div>
    </div>
  );
}
