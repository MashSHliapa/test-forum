import { useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './Filter.scss';

export function Filter() {
  const [request, setRequest] = useState('');
  const navigate = useNavigate();

  function handleInputSearchForm(event: ChangeEvent<HTMLInputElement>) {
    setRequest(event.target.value);
  }

  function handleSubmitForm(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    if (request.trim()) {
      navigate(`/filter-results/${encodeURIComponent(request.trim())}`);
      setRequest('');
    }
  }

  return (
    <form action="#" className="filter__form" onSubmit={handleSubmitForm}>
      <input
        type="text"
        className="filter__input"
        placeholder="Filter by users"
        value={request}
        onChange={handleInputSearchForm}
      />
    </form>
  );
}
