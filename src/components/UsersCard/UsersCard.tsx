import type { IUsersCard } from '../../types/interfaces';
import './UsersCard.scss';

export function UsersCard(props: { user: IUsersCard }) {
  return (
    <div className="users-card card">
      <div className="users-card__body card-body">
        <h3 className="users-card__name">{props.user.name}</h3>
        <h3 className="users-card__username">{props.user.username}</h3>
        <p className="users-card__website">
          <span>website: </span>
          {props.user.website}
        </p>
        <p className="users-card__company">
          <span>company: </span>
          {props.user.company.name}
        </p>
      </div>
    </div>
  );
}
