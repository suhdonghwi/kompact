import 'tui-image-editor/dist/tui-image-editor.css';
import ImageEditor from '@toast-ui/react-image-editor';
import styled from 'styled-components';

const Container = styled.div``;

function EditDisk() {
  return (
    <Container>
      <ImageEditor
        includeUI={{
          loadImage: {
            path: 'public/img/disk.png',
            name: 'Disk',
          },
          menu: ['shape', 'filter'],
          initMenu: 'shape',
          uiSize: {
            width: '1000px',
            height: '700px',
          },
          menuBarPosition: 'bottom',
        }}
        cssMaxHeight={500}
        cssMaxWidth={700}
        selectionStyle={{
          cornerSize: 20,
          rotatingPointOffset: 70,
        }}
        usageStatistics={false}
      />
    </Container>
  );
}

export default EditDisk;
