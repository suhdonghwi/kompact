import { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import { Container, Stack, styled, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { auth } from '../firebase';
import Logo from '../components/Logo';
import { useNavigate } from 'react-router-dom';

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

function Register() {
  const { control, handleSubmit } = useForm<RegisterData>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = useCallback(async (data: RegisterData) => {
    setLoading(true);
    try {
      await setPersistence(auth, browserLocalPersistence);
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      await updateProfile(user, { displayName: data.username });
      navigate('/profile');
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container maxWidth="xs">
        <CenteredStack spacing={2}>
          <Logo />
          <Controller
            name="username"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <TextField label="이름" required variant="outlined" {...field} />
            )}
          />
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
