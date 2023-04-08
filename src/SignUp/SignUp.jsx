import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './SignUp.style';

const SignUp = () => {
  const navigate = useNavigate();
  const goSignUp = () => {
    fetch('https://www.pre-onboarding-selection-task.shop/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: input.email,
        password: input.pw,
      }),
    }).then(response => {
      if (response.status === 201) {
        console.log(response);
        navigate('/signin');
      } else {
        alert('이미 가입된 이메일 입니다');
      }
    });
  };
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/todo');
    }
  }, []);
  const [input, setInput] = useState({ email: '', pw: '' });
  const saveInput = e => {
    setInput(prevInput => ({ ...prevInput, [e.target.name]: e.target.value }));
  };
  return (
    <S.SignupContainer>
      <S.SignUpTitle>Sign-up</S.SignUpTitle>
      <S.IdAndPwInput
        name="email"
        data-testid="email-input"
        type="text"
        placeholder="@을 포함한 이메일을 입력해 주세요"
        onChange={saveInput}
        value={input.email}
      />
      <S.IdAndPwInput
        name="pw"
        data-testid="password-input"
        type="password"
        placeholder="패스워드 8자리 이상을 입력해 주세요"
        onChange={saveInput}
        value={input.pw}
      />
      {input.email.includes('@') && input.pw.length >= 8 ? (
        <S.SignUpBtn
          data-testid="signup-button"
          disabled={false}
          onClick={goSignUp}
        >
          회원가입
        </S.SignUpBtn>
      ) : (
        <S.SignUpBtn data-testid="signup-button" disabled={true}>
          회원가입
        </S.SignUpBtn>
      )}
    </S.SignupContainer>
  );
};
export default SignUp;
