import { useGetUserQuery } from '../../../../rtk/endpoints/user-auth/user-api.endpoint';

const UserProfiler = () => {
  const { data: user} = useGetUserQuery();
  if (!user) return null;

  return (
    <section className="header__profile profile">
      <p className="profile__rating">{user.username}</p>
      <img
        className="profile__avatar"
        src={user.image}
        alt="Avatar"
        width="35"
        height="35"
      />
    </section>
  );
};

export default UserProfiler;
