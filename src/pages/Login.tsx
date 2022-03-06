import { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import { Button, Container, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import styled from 'styled-components';

interface LoginData {
  email: string;
  password: string;
}

function Login() {
  const { control, handleSubmit } = useForm<LoginData>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = useCallback(async (data: LoginData) => {
    setLoading(true);
    try {
      await setPersistence(auth, browserLocalPersistence);
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate('/profile');
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container maxWidth="xs">
          <CenteredStack spacing={2}>
            <Logo />
            <Controller
              name="email"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <TextField
                  label="이메일"
                  type="email"
                  required
                  variant="outlined"
                  {...field}
                />
              )}
            />
            <Controller
              name="password"
              defaultValue=""
              control={control}
              rules={{
                minLength: { value: 6, message: '비밀번호는 최소 6자입니다.' },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  label="비밀번호"
                  error={fieldState.error?.type === 'minLength'}
                  helperText={fieldState.error?.message}
                  type="password"
                  required
                  variant="outlined"
                  {...field}
                />
              )}
            />
            <LoadingButton type="submit" loading={loading} variant="contained">
              로그인
            </LoadingButton>
            <Button onClick={() => navigate('/register')} variant="outlined">
              회원가입
            </Button>
          </CenteredStack>
        </Container>
      </form>
    </>
  );
}

const CenteredStack = styled(Stack)`
  height: 100vh;
  justify-content: center;
`;

export default Login;
