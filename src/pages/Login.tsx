import { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Container, Stack, styled, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { auth } from '../firebase';

interface LoginData {
  email: string;
  password: string;
}

function Login() {
  const { control, handleSubmit } = useForm<LoginData>({});
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(async (data: LoginData) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container maxWidth="xs">
        <CenteredStack spacing={2}>
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
            rules={{ minLength: 6 }}
            render={({ field }) => (
              <TextField
                label="비밀번호"
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
        </CenteredStack>
      </Container>
    </form>
  );
}

const CenteredStack = styled(Stack)`
  height: 100vh;
  justify-content: center;
`;

export default Login;
