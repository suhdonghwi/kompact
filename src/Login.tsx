import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

interface LoginData {
  email: string;
  password: string;
}

function Login() {
  const { register, handleSubmit } = useForm<LoginData>({});

  const onSubmit = useCallback((data: LoginData) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, data.email, data.password);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      <input {...register('password')} />
      <button type="submit">로그인</button>
    </form>
  );
}

export default Login;
