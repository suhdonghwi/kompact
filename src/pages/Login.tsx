import { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Container, Stack, styled, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

interface LoginData {
  email: string;
  password: string;
}

function Login() {
  const { control, handleSubmit } = useForm<LoginData>({});
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback((data: LoginData) => {
    setLoading(true);
    const auth = getAuth();
    try {
      signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container maxWidth="xs">
        <CenteredStack spacing={2}>
          <Controller name="email" control={control} render={({ field }) => <TextField label="이메일" variant="outlined" {...field} />} />
          <Controller name="password" control={control} render={({ field }) => <TextField label="비밀번호" variant="outlined" {...field} />} />
          <LoadingButton onClick={() => handleSubmit(onSubmit)} loading={loading} variant="contained">
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
