import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './SignIn.style';

const SignIn = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({ email: '', pw: '' });

  const saveInput = e => {
    setInput(prevInput => ({ ...prevInput, [e.target.name]: e.target.value }));
  };
  const goSignIn = () => {
    fetch('https://www.pre-onboarding-selection-task.shop/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        email: input.email,
        password: input.pw,
      }),
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        localStorage.setItem('token', data.access_token);
        if (localStorage.getItem('token') !== 'undefined') {
          return navigate('/todo');
        } else {
          alert('아이디 혹은 비밀번호가 일치하지 않습니다.');
        }
      });
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/todo');
    }
  }, []);

  return (
    <S.SigninContainer>
      <S.SigninTitle>Sign-in</S.SigninTitle>
      <S.IdAndPwInput
        name="email"
        data-testid="email-input"
        type="text"
        placeholder="이메일을 입력해 주세요"
        onChange={saveInput}
        value={input.email}
      />
      <S.IdAndPwInput
        name="pw"
        data-testid="password-input"
        type="password"
        placeholder="패스워드를 입력해 주세요"
        onChange={saveInput}
        value={input.pw}
      />
      {input.email.includes('@') && input.pw.length >= 8 ? (
        <S.SignInBtn
          data-testid="signin-button"
          disabled={false}
          onClick={goSignIn}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              goSignIn();
            }
          }}
        >
          로그인
        </S.SignInBtn>
      ) : (
        <S.SignInBtn data-testid="signin-button" disabled={true}>
          로그인
        </S.SignInBtn>
      )}
    </S.SigninContainer>
  );
};

export default SignIn;
