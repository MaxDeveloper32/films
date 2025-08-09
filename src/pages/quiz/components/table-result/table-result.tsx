import { useEffect } from 'react';
import { useAppSelector } from '../../../../hooks/use-app-redux/use-app-redux';
import { useGetTableResultQuery, useUpdateTableResultMutation } from '../../../../rtk/endpoints/films/api/api';
import './table-result.css';

const TableResult = () => {
  const { data: users = [] } = useGetTableResultQuery();
  const [updateUser] = useUpdateTableResultMutation();

  const result = useAppSelector((state) => state.result.result);
  const user = { id: 3, name: 'Макс', result: result };

  useEffect(() => {
    updateUser(user);
  }, [result]);

  if (!users.length) return null;

  return (
    <div className="table-participants">
      <table className="table-participants__table">
        <thead>
          <tr className="table-participants__header-row">
            <th className="table-participants__header-cell">Имя</th>
            <th className="table-participants__header-cell">Результат</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="table-participants__row">
              <td className="table-participants__cell">{user.name}</td>
              <td className="table-participants__cell">{user.result}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default TableResult;
