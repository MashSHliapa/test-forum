import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersRequest } from '../../redux/usersSlice';
import { UsersCard } from '../../components/UsersCard/UsersCard';
import type { AppDispatch, RootState } from '../../redux/store';
import type { IUsersCard } from '../../types/interfaces';

export function Users() {
  const { data: users, loading, error } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, [dispatch]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  const usersList = users.map((item: IUsersCard) => <UsersCard key={item.id} user={item} />);

  return (
    <div className="catalog">
      <div className="catalog__container _container">
        <div className="catalog__body body">
          <h1 className="catalog__title title">Users</h1>
          <div className="catalog__list">{usersList}</div>
        </div>
      </div>
    </div>
  );
}
