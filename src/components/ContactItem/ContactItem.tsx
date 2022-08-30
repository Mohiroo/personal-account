import { CheckOutlined, CloseOutlined, DeleteOutlined, EditTwoTone, RightOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import { IContacts } from "../../model/IAccount";
import "./ContactItem.scss";

interface ContactItemProps {
  id: number;
  name: string;
  surname: string;
  tel: string;
  email: string;
  description: string;
  deleteContact: (contact: IContacts) => void;
  sendChanges: (contact: IContacts) => void;
}

const ContactItem: React.FC<ContactItemProps> = ({ id, name, surname, tel, email, description, deleteContact, sendChanges }) => {
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

  const isValidTel = () => /^[0-9]{10}$/.test(editableData.tel);
  const isValidEmail = () => /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(editableData.email);

  const undoChanges = () => {
    if (!isValidTel() || !isValidEmail()) {
      setEditableData(inputState);
      setIsEditMode(false);
      return;
    }

    setEditableData(inputState);
    setIsEditMode(false);
  };

  const confirmChanges = () => {
    if (!isValidTel() || !isValidEmail()) return;

    setInputState(editableData);
    sendChanges(inputState);
    setIsEditMode(false);
  };

  const telPart = (startNum: number, endNumber: number) => inputState.tel.substring(startNum, endNumber);

  return (
    <article className="contact-item">
      <form className="contact-item-card">
        <Button
          type="primary"
          shape="circle"
          size="small"
          icon={<RightOutlined />}
          onClick={() => setisDescription(!isDescription)}
          className={"contact-item-button-description" + (isDescription ? "-active" : "")}
        />
        <div className="contact-item-info">
          <span className="contact-item-id">{inputState.id}</span>
          {isEditMode ? (
            <>
              <Input
                placeholder="Имя"
                defaultValue={inputState.name}
                onChange={(e) => setEditableData({ ...editableData, name: e.target.value })}
                className="contact-item-unit"
              />
              <Input
                placeholder="Фамилия"
                defaultValue={inputState.surname}
                onChange={(e) => setEditableData({ ...editableData, surname: e.target.value })}
                className="contact-item-unit"
              />
              <Input
                placeholder="Телефон"
                defaultValue={inputState.tel}
                onChange={(e) => setEditableData({ ...editableData, tel: e.target.value })}
                maxLength={10}
                className="contact-item-unit"
                type={"tel"}
                status={isValidTel() ? "" : "error"}
              />
              <Input
                placeholder="Почта"
                defaultValue={inputState.email}
                onChange={(e) => setEditableData({ ...editableData, email: e.target.value })}
                className="contact-item-unit"
                status={isValidEmail() ? "" : "error"}
              />
              <div>
                <Button type="link" onClick={(e) => confirmChanges()} icon={<CheckOutlined />} />
                <Button type="text" onClick={undoChanges} icon={<CloseOutlined />} />
              </div>
            </>
          ) : (
            <>
              <span className="contact-item-unit">{inputState.name}</span>
              <span className="contact-item-unit">{inputState.surname}</span>
              <span className="contact-item-unit">
                +7 ({telPart(0, 3)}) {telPart(3, 6)}-{telPart(6, 8)}-{telPart(8, 11)}
              </span>
              <span className="contact-item-unit">{inputState.email}</span>
              <div>
                <Button type="link" onClick={() => setIsEditMode(true)} icon={<EditTwoTone />} />
                <Button type="text" onClick={() => deleteContact(inputState)} danger icon={<DeleteOutlined />} />
              </div>
            </>
          )}
        </div>
      </form>
      {isDescription &&
        (isEditMode ? (
          <TextArea
            rows={2}
            defaultValue={inputState.description}
            onChange={(e) => setEditableData({ ...inputState, description: e.target.value })}
            className="contact-item-description"
          />
        ) : (
          <p className="contact-item-description">{inputState.description}</p>
        ))}
    </article>
  );
};

export default ContactItem;
