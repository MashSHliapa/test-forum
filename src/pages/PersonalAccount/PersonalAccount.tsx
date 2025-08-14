import { useState, type ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { getFromLocalStorage } from '../../helpers/getFromLocalStorage';
import { setToLocalStorage } from '../../helpers/setToLocalStorage';
import type { FormDataType } from '../../types/interfaces';

export function PersonalAccount() {
  const [user, setUser] = useState(getUserData);
  const [newUserData, setNewUserData] = useState(getUserData);
  const { register, reset } = useForm<FormDataType>({
    mode: 'onChange',
  });

  function getUserData() {
    const userData = getFromLocalStorage('user');
    return userData;
  }

  function handleChangeData(event: ChangeEvent<HTMLInputElement>) {
    const { id, value } = event.target;
    const idToKeyMap: { [key: string]: keyof FormDataType } = {
      'name-account': 'name',
      'username-account': 'username',
      'email-account': 'email',
      'website-account': 'website',
      'company-account': 'company',
    };

    const key = idToKeyMap[id];
    if (key) {
      setNewUserData((prev: FormDataType) => ({ ...prev, [key]: value }));
    }
  }

  function handleSubmitForm(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setToLocalStorage('user', newUserData);
      setUser(newUserData);
      reset();
      alert('Data updated successfully');
    } catch (error) {
      return <div className="text-danger">Something went wrong</div>;
    }
  }

  return (
    <div className="personal-account">
      <div className="personal-account__container _container">
        <div className="personal-account__body body">
          <h3 className="personal-account__title title">Personal account</h3>
          <div className="personal-account__sign-in sign-in">
            <form action="#" className="sign-in__form card-body" onSubmit={handleSubmitForm}>
              <div className="sign-in__item">
                <label htmlFor="name-account" className="sign-in__label">
                  Name: {user.name}
                </label>
                <input
                  id="name-account"
                  type="text"
                  className="sign-in__input"
                  placeholder="New name"
                  {...register('name')}
                  onChange={handleChangeData}
                />
              </div>

              <div className="sign-in__item">
                <label htmlFor="username-account" className="sign-in__label">
                  Userame: {user.username}
                </label>
                <input
                  id="username-account"
                  type="text"
                  className="sign-in__input"
                  placeholder="New username"
                  {...register('username')}
                  onChange={handleChangeData}
                />
              </div>

              <div className="sign-in__item">
                <label htmlFor="email-account" className="sign-in__label">
                  Email: {user.email}
                </label>
                <input
                  id="email-account"
                  type="text"
                  className="sign-in__input"
                  placeholder="New email"
                  {...register('email')}
                  onChange={handleChangeData}
                />
              </div>

              <div className="sign-in__item">
                <label htmlFor="website-account" className="sign-in__label">
                  Website: {user.website}
                </label>
                <input
                  id="website-account"
                  type="text"
                  className="sign-in__input"
                  placeholder="New website"
                  {...register('website')}
                  onChange={handleChangeData}
                />
              </div>

              <div className="sign-in__item">
                <label htmlFor="company-account" className="sign-in__label">
                  Company: {user.company}
                </label>
                <input
                  id="company-account"
                  type="text"
                  className="sign-in__input"
                  placeholder="New company"
                  {...register('company')}
                  onChange={handleChangeData}
                />
              </div>

              <button type="submit" className="sign-in__button button">
                Change data
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
