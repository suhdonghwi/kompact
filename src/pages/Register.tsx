import { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Container, Stack, styled, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

function Register() {
  const { control, handleSubmit } = useForm<RegisterData>({});
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(async (data: RegisterData) => {
    setLoading(true);
    const auth = getAuth();
    try {
      const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await updateProfile(user, { displayName: data.username });
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container maxWidth="xs">
        <CenteredStack spacing={2}>
          <Controller name="username" control={control} render={({ field }) => <TextField label="이름" variant="outlined" {...field} />} />
          <Controller name="email" control={control} render={({ field }) => <TextField label="이메일" variant="outlined" {...field} />} />
          <Controller name="password" control={control} render={({ field }) => <TextField label="비밀번호" variant="outlined" {...field} />} />
          <LoadingButton onClick={() => handleSubmit(onSubmit)} loading={loading} variant="contained">
            가입
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

export default Register;
