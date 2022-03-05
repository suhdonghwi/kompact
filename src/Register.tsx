import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

function Register() {
  const { register, handleSubmit } = useForm<RegisterData>({});

  const onSubmit = useCallback(async (data: RegisterData) => {
    const auth = getAuth();
    const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);
    await updateProfile(user, { displayName: data.username });
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('username')} />
      <input {...register('email')} />
      <input {...register('password')} />
      <button type="submit">가입</button>
    </form>
  );
}

export default Register;
