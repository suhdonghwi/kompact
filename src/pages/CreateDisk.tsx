import {
  FirebaseStorage,
  getStorage,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { userState } from '../atoms/firebase';
import {
  ImageList,
  ImageListItem,
  Paper,
  Stack,
  TextField,
  Container as Center,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Add as AddIcon } from '@mui/icons-material';
import Disk from '../components/Disk';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

const ImagesWrapper = styled.div`
  width: 100vw;
  margin-top: 1rem;
  overflow-x: scroll;
`;

const UploadButtonWrapper = styled.div`
  position: absolute;
  right: 0;
`;

const StyledDisk = styled(Disk)`
  position: absolute;
  width: 50vw;
  height: 50vw;
  bottom: -25vw;
  left: 25vw;
  cursor: pointer;
`;

const AddButton = styled(Paper)`
  cursor: pointer;
  width: 30vh;
  height: 30vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InvisibleInput = styled.input`
  display: none;
`;

const Title = styled.h1`
  margin: 1rem 0;
  text-align: center;
  font-size: 48px;
`;

function CreateDisk() {
  const [diskName, setDiskName] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const email = useRecoilValue(userState)?.email;

  const upload = async () => {
    if (!files || !coverFile) return;
    setUploading(true);
    const storage = getStorage();
    const db = getFirestore();

    const docRef = await addDoc(collection(db, 'disks'), {
      email,
      name: diskName,
      createdAt: new Date(),
      length: files.length,
    });

    const coverRef = ref(storage, `${docRef.id}/cover`);
    await uploadBytes(coverRef, coverFile);
    for (let i = 0; i < files.length; i++) {
      const storageRef = ref(storage, `${docRef.id}/${i}`);
      await uploadBytes(storageRef, files[i]);
    }
    setUploading(false);
    alert('업로드 성공!!');
    navigate('/profile');
  };

  return (
    <Container>
      <Title>콤팩트 디스크 굽기</Title>
      <Center maxWidth="lg">
        <TextField
          placeholder="디스크 이름"
          onChange={(e) => {
            setDiskName(e.target.value);
          }}
          variant="standard"
          fullWidth
          disabled={uploading}
        />
        <ImagesWrapper>
          <Stack direction="row" spacing={2}>
            {files.map((file) => (
              <img
                key={file.name}
                src={`${URL.createObjectURL(file)}`}
                style={{ height: '30vh' }}
                loading="lazy"
              />
            ))}
            <label htmlFor="contained-button-file">
              <InvisibleInput
                id="contained-button-file"
                type="file"
                multiple
                onChange={(e) => {
                  setFiles((prevFiles) => [
                    ...prevFiles,
                    ...Array.from(e.target.files || []),
                  ]);
                }}
              />
              <AddButton variant="outlined">
                <AddIcon />
              </AddButton>
            </label>
          </Stack>
        </ImagesWrapper>
      </Center>

      <label htmlFor="cover-image">
        <InvisibleInput
          id="cover-image"
          type="file"
          onChange={(e) => {
            setCoverFile(e.target.files?.[0] || null);
          }}
        />
        <StyledDisk
          backgroundImage={
            coverFile ? `${URL.createObjectURL(coverFile)}` : undefined
          }
        />
      </label>
      <UploadButtonWrapper>
        <LoadingButton loading={uploading} onClick={upload}>
          업로드
        </LoadingButton>
      </UploadButtonWrapper>
    </Container>
  );
}

export default CreateDisk;
