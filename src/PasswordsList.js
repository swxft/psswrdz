import { useSelector } from 'react-redux';

function PasswordsList() {
  const passwords = useSelector(state => state.passwords.value);

  return (
    <div>
      <ul>
        {passwords.map((password, i) => (
          <li key={`${i}-item`}>{password.name} : {password.password}</li>
        ))}
      </ul></div>
  );
}

export default PasswordsList;