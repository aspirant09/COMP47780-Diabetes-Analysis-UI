import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FileUpload = ({ onDataReceived }) => {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate=useNavigate();

  const handleFile1Change = (e) => {
    setFile1(e.target.files[0]);
  };

  const handleFile2Change = (e) => {
    setFile2(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('patient_data', file1);
    formData.append('medical_data', file2);
    setShowModal(true);

    try {
      const response = await axios.post('http://ec2-34-205-16-134.compute-1.amazonaws.com:8000/uploadFiles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('File Upload Successful');
      console.log("Received",response.data);
      //window.location.href = '/new-ui';
      onDataReceived(response.data);
      setShowModal(false)
      navigate('/details');
    } catch (error) {
      console.error('Error uploading files', error);
    }
    
    
  };

  

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Form onSubmit={handleSubmit}>
            <Col xs={12} className="mb-3"> {/* Add margin bottom */}
              <Form.Group controlId="file1">
                <Form.Label>Patient Details</Form.Label>
                <Form.Control type="file" onChange={handleFile1Change} />
              </Form.Group>
            </Col>

            <Col xs={12} className="mb-3"> {/* Add margin bottom */}
              <Form.Group controlId="file2">
                <Form.Label>Medical Records</Form.Label>
                <Form.Control type="file" onChange={handleFile2Change} />
              </Form.Group>
            </Col>

            <Col xs={12} className="mb-3"> {/* Add margin bottom */}
              <Button variant="primary" type="submit">
                Upload
              </Button>
            </Col>

            {uploadStatus && <p>{uploadStatus}</p>}

            {/* Modal for indicating the upload is in progress */}
            <Modal show={showModal} onHide={() => {}}>
              <Modal.Body>
                <p>File uploaded. Please wait for it to be processed... You will be redirected shortly</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FileUpload;
