import React, { useState } from "react";
import { ButtonGroup, Button, Col, Container, Form, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faItalic, faUnderline, faAlignLeft, faAlignCenter, faAlignRight } from "@fortawesome/free-solid-svg-icons";
import parse from 'html-react-parser';


export const TextEditor: React.FC = () => {
  const [content, setContent] = useState("");
  const [charCount, setCharCount] = useState(0);
  const maxCharCount = 1000;

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = event.target.value;
    setCharCount(newContent.length);
    if (newContent.length <= maxCharCount) {
      setContent(newContent);
    }
  };

  const handleFormat = (format: string) => {
    const textarea = document.getElementById("contentTextArea") as HTMLTextAreaElement;
    const selectedText = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd);
  
    if (selectedText) {
      let formattedText = "";
  
      switch (format) {
        case "bold":
          formattedText = `<span style="font-weight: bold;">${selectedText}</span>`;
          break;
        case "italic":
          formattedText = `<span style="font-style: italic;">${selectedText}</span>`;
          break;
        case "underline":
          formattedText = `<u>${selectedText}</u>`;
          break;
        case "align-left":
          formattedText = `<div style="text-align: left;">${content}</div>`;
          break;
        case "align-center":
          formattedText = `<div style="text-align: center;">${content}</div>`;
          break;
        case "align-right":
          formattedText = `<div style="text-align: right;">${selectedText}</div>`;
          break;
        default:
          formattedText = selectedText;
          break;
      }
      let updatedContent =
        textarea.value.substring(0, textarea.selectionStart) +
        formattedText +
        textarea.value.substring(textarea.selectionEnd);
        
      if (format === "align-left") {
        updatedContent = `<div style="text-align: left;">${content}</div>`;
      } 
      if ( format === "align-center") {
        updatedContent = `<div style="text-align: center;">${content}</div>`;
      } 
      if ( format === "align-right") {
        updatedContent = `<div style="text-align: right;">${content}</div>`;
      }
      setContent(updatedContent);
    }
  };
  
  

  return (
    <>
    <Container className="mt-4">
      <h1>Text Editor</h1>
      <Row className="mb-3">
        <ButtonGroup aria-label="Basic example">
          <Button variant="light"  onClick={() => handleFormat("bold")}>
            <FontAwesomeIcon icon={faBold} />
          </Button>
          <Button variant="light"  onClick={() => handleFormat("italic")}>
            <FontAwesomeIcon icon={faItalic} />
          </Button>
          <Button variant="light" onClick={() => handleFormat("underline")}>
            <FontAwesomeIcon icon={faUnderline} />
          </Button>
          <Button variant="light" onClick={() => handleFormat("align-left")}>
            <FontAwesomeIcon icon={faAlignLeft} />
          </Button>
          <Button variant="light" onClick={() => handleFormat("align-center")}>
            <FontAwesomeIcon icon={faAlignCenter} />
          </Button>
          <Button variant="light" onClick={() => handleFormat("align-right")}>
            <FontAwesomeIcon icon={faAlignRight} />
          </Button>
        </ButtonGroup>
      </Row>
      <Form>
        <Form.Group controlId="contentTextArea">
          <Form.Control
            as="textarea"
            rows={6}
            value={content}
            onChange={handleContentChange}
            maxLength={maxCharCount}
          />
          <Form.Text>
            Characters: {charCount}/{maxCharCount}
          </Form.Text>
        </Form.Group>
      </Form>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          
        </Col>
      </Row>
    </Container>
      <div>
        <h2>Content</h2>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </>
  );
};
