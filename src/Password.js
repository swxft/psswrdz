import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPassword } from './app/features/passwords/passwordsSlice';
import zxcvbn from 'zxcvbn';
import './password.css';

function checkPasswordStrength(result) {
  const score = result.score;
  const feedback = result.feedback.suggestions[0];
  if (score < 2) {
    return (
      <div>
        <div>Password strength is poor.</div>
        <div>{feedback}</div>
      </div>
    );
  } else if (score >= 2 && score < 4) {
    return (
      <div>
        <div>Password strength is good but not best.</div>
        <div>{feedback}</div>
      </div>
    );
  } else {
    return (
      <div>
        <div>Password strength is strong.</div>
        <div>{feedback}</div>
      </div>
    );
  }
}

function Password() {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');

  function randomCharacter() {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const symbols = ['_', '.'];
    const choices = letters.concat(numbers, symbols);
    return choices[Math.floor(Math.random() * choices.length)];
  }

  function generatePassword() {
    const password = [];
    for (let i = 0; i < 8; i++) {
      password.push(randomCharacter());
    }
    setPassword(password.join("").toString());
  }

  return (
    <div>
      <div className='input-element'>
        <label>Enter a password</label>
        <input
          type="text"
          placeholder='Enter a password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <div>
          <button onClick={(e) => {
            generatePassword();}} 
            className="button">Generate</button>
          <button onClick={() => {
            const strength = zxcvbn(password);
            setPasswordStrength(checkPasswordStrength(strength))}} 
            className="button">Check password strength</button>
        </div>
        <div>
          {passwordStrength}
        </div>
      </div>
      <div className='input-element'>
        <label>Enter a name</label>
        <input
          type="text"
          placeholder='Enter a name'
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>

      <button
        onClick={() => dispatch(addPassword({ name, password }))}
        className="button"
      >Save</button>
    </div>
  );
}

export default Password;
