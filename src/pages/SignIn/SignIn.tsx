import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { setToLocalStorage } from '../../helpers/setToLocalStorage';
import type { FormDataType } from '../../types/interfaces';
import './SignIn.scss';

export function SignIn() {
  const { register, handleSubmit, reset } = useForm<FormDataType>({
    mode: 'onChange',
  });

  const navigate = useNavigate();

  const onSubmit = async (data: FormDataType) => {
    try {
      const { name, username, email, website, company } = data;

      const userData = {
        name,
        username,
        email,
        website,
        company,
      };

      setToLocalStorage('user', userData);
      alert('Data saved successfully!');
      navigate('/');
      reset();
    } catch (error) {
      console.error('Error saving data', error);
    }
  };

  return (
    <div className="sign-in">
      <div className="sign-in__container _container">
        <div className="sign-in__body body">
          <h3 className="sign-in__title title">Sign In</h3>
          <form action="#" className="sign-in__form card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="sign-in__item">
              <label htmlFor="name-signIn" className="sign-in__label">
                Name
              </label>
              <input
                id="name-signIn"
                type="text"
                className="sign-in__input"
                placeholder="Your name"
                {...register('name')}
                required
              />
            </div>

            <div className="sign-in__item">
              <label htmlFor="username-signIn" className="sign-in__label">
                Userame
              </label>
              <input
                id="username-signIn"
                type="text"
                className="sign-in__input"
                placeholder="Your username"
                {...register('username')}
                required
              />
            </div>

            <div className="sign-in__item">
              <label htmlFor="email-signIn" className="sign-in__label">
                Email
              </label>
              <input
                id="email-signIn"
                type="text"
                className="sign-in__input"
                placeholder="Your email"
                {...register('email')}
                required
              />
            </div>

            <div className="sign-in__item">
              <label htmlFor="website-signIn" className="sign-in__label">
                Website
              </label>
              <input
                id="website-signIn"
                type="text"
                className="sign-in__input"
                placeholder="Your website"
                {...register('website')}
                required
              />
            </div>

            <div className="sign-in__item">
              <label htmlFor="company-signIn" className="sign-in__label">
                Company
              </label>
              <input
                id="company-signIn"
                type="text"
                className="sign-in__input"
                placeholder="Your company"
                {...register('company')}
                required
              />
            </div>

            <button type="submit" className="sign-in__button">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
