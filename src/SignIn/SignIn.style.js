import styled from 'styled-components';

export const SigninContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  flex-wrap: wrap;
  width: 350px;
  height: 402px;
  margin: 200px auto;
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  background-color: #fff;
`;

export const SigninTitle = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin: 36px 0;
  font-size: 48px;
  font-weight: 700;
`;

export const IdAndPwInput = styled.input`
  display: block;
  width: 268px;
  height: 40px;
  margin-bottom: 10px;
  padding: 2px;
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  line-height: 30px;

  ::placeholder {
    padding-left: 10px;
  }

  :focus {
    border-color: #dbd;
  }
`;

export const SignInBtn = styled.button`
  width: 268px;
  height: 40px;
  margin-top: 20px;
  border-radius: 8px;
  border: 1px solid #dbdbdb;
  font-weight: 500;
`;
