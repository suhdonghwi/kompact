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
  Button,
  ImageList,
  ImageListItem,
  Stack,
  TextField,
} from '@mui/material';
import './Disk.css';

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

const InputWrapper = styled.div`
  margin-top: 1rem;
`;

function CreateDisk() {
  const [diskName, setDiskName] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const email = useRecoilValue(userState)?.email;

  const upload = async () => {
    if (!files) return;
    setUploading(true);
    const storage = getStorage();
    const db = getFirestore();

    const docRef = await addDoc(collection(db, 'disks'), {
      email,
      name: diskName,
      createdAt: new Date(),
      length: files.length,
    });

    for (let i = 0; i < files.length; i++) {
      const storageRef = ref(storage, `${docRef.id}/${i}`);
      await uploadBytes(storageRef, files[i]);
    }
    setUploading(false);
    alert('success!!');
  };

  return (
    <Container>
      <InputWrapper>
        <TextField
          placeholder="Disk Name"
          onChange={(e) => {
            setDiskName(e.target.value);
          }}
          variant="standard"
          disabled={uploading}
        />
      </InputWrapper>
      <InputWrapper>
        <input
          type="file"
          multiple
          onChange={(e) => {
            setFiles(e.target.files);
          }}
        />
      </InputWrapper>
      <ImageList cols={files?.length} style={{ width: '100%' }}>
        {Array.from(files || []).map((file) => (
          <ImageListItem key={file.name}>
            <img
              src={`${URL.createObjectURL(file)}`}
              style={{ height: '30vh' }}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
      <div className="cd"></div>
      <InputWrapper>
        <Button onClick={upload}>Upload</Button>
      </InputWrapper>
    </Container>
  );
}

export default CreateDisk;
