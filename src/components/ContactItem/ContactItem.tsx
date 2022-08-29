import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditTwoTone,
  RightOutlined,
} from "@ant-design/icons";
import { Button, Input, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useRef, useState } from "react";
import { IContacts } from "../../model/IAccount";
import "./ContactItem.scss";

interface ContactItemProps {
  id: number;
  name: string;
  surname: string;
  tel: string;
  email: string;
  description: string;
  deleteContact: () => void;
  patchData: () => void;
}

const ContactItem: React.FC<ContactItemProps> = ({
  id,
  name,
  surname,
  tel,
  email,
  description,
  deleteContact,
  patchData,
}) => {
  const [inputState, setInputState] = useState<IContacts>({
    id: id,
    name: name,
    surname: surname,
    tel: tel,
    email: email,
    description: description,
  });
  const [editableData, setEditableData] = useState<IContacts>(inputState);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isDescription, setisDescription] = useState<boolean>(false);

  const isValidTel = () => /^[0-9]/.test(editableData.tel);
  // При вводе 1 цифры или букв тоже true
  const isValidEmail = () =>
    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(editableData.email);

  const undoChanges = () => {
    setEditableData(inputState);
    setIsEditMode(false);
  };

  const confirmChanges = () => {
    setInputState(editableData);
    patchData();
    setIsEditMode(false);
  };

  const telPart = (startNum: number, endNumber: number) =>
    inputState.tel.substring(startNum, endNumber);

  return (
    <article className="contact-item">
      <form className="contact-item-info">
        <Button
          type="primary"
          shape="circle"
          size="small"
          icon={<RightOutlined />}
          onClick={() => setisDescription(!isDescription)}
          className={
            "contact-item-button-description" + isDescription ? "-active" : ""
          }
        />
        <span className="contact-item-id">{inputState.id}</span>
        {isEditMode ? (
          <>
            <Input
              defaultValue={inputState.name}
              onChange={(e) =>
                setEditableData({ ...editableData, name: e.target.value })
              }
              className="contact-item-unit"
            />
            <Input
              defaultValue={inputState.surname}
              onChange={(e) =>
                setEditableData({ ...editableData, surname: e.target.value })
              }
              className="contact-item-unit"
            />
            <Input
              defaultValue={inputState.tel}
              onChange={(e) =>
                setEditableData({ ...editableData, tel: e.target.value })
              }
              maxLength={10}
              className="contact-item-unit"
              type={"tel"}
              status={isValidTel() ? "" : "error"}
            />
            <Input
              defaultValue={inputState.email}
              onChange={(e) =>
                setEditableData({ ...editableData, email: e.target.value })
              }
              className="contact-item-unit"
              status={isValidEmail() ? "" : "error"}
            />
            <div>
              <Button
                type="link"
                onClick={(e) => confirmChanges()}
                icon={<CheckOutlined />}
              />
              <Button
                type="text"
                onClick={undoChanges}
                icon={<CloseOutlined />}
              />
            </div>
          </>
        ) : (
          <>
            <span className="contact-item-unit">{inputState.name}</span>
            <span className="contact-item-unit">{inputState.surname}</span>
            <span className="contact-item-unit">
              +7 ({telPart(0, 3)}) {telPart(3, 6)}-{telPart(6, 8)}-
              {telPart(8, 11)}
            </span>
            <span className="contact-item-unit">{inputState.email}</span>
            <div>
              <Button
                type="link"
                onClick={(e) => setIsEditMode(true)}
                icon={<EditTwoTone />}
              />
              <Button
                type="text"
                onClick={deleteContact}
                danger
                icon={<DeleteOutlined />}
              />
            </div>
          </>
        )}
      </form>
      {isDescription &&
        (isEditMode ? (
          <TextArea
            rows={2}
            defaultValue={inputState.description}
            onChange={(e) =>
              setEditableData({ ...inputState, description: e.target.value })
            }
            className="contact-item-description"
          />
        ) : (
          <p className="contact-item-description">{inputState.description}</p>
        ))}
    </article>
  );
};

export default ContactItem;
