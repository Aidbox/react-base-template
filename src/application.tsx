import React, { useEffect } from 'react';

import { AidboxContext } from './aidbox';
import css from './application.module.scss';

const Application = () => {
  const [userinfo, setUserinfo] = React.useState<null | { id: string }>(null);
  const [error, setError] = React.useState<null | string>(null);
  const client = React.useContext(AidboxContext);

  useEffect(() => {
    client.getUserInfo().then((res) => {
      if (res.status === 200) {
        setUserinfo(res.data);
      }
    });
  }, [client]);

  const handleFormSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const username = formData.get('username');
    const password = formData.get('password');
    client.authorize({ username, password }).then((res) => {
      if (res.status !== 200) {
        const data: any = res.data;
        setError(data.error_description || data.error);
      } else {
        setError(null);
        setUserinfo(res.data.userinfo);
      }
    });
  };

  const handleLogoutClick = () => {
    client.closeSession().then(() => {
      setUserinfo(null);
    });
  };

  return (
    <div className={css.main}>
      {error && (
        <div>
          <div>{error}</div>
          <hr />
        </div>
      )}

      {userinfo ? (
        <div>
          <div>Logged in as {userinfo.id}</div>
          <button type="button" onClick={handleLogoutClick}>
            Logout
          </button>
        </div>
      ) : (
        <form action="" onSubmit={handleFormSubmit}>
          <div>
            <input type="text" name="username" />
          </div>
          <div>
            <input type="password" name="password" />
          </div>
          <button type="submit">Authorize</button>
        </form>
      )}
    </div>
  );
};

export default Application;
