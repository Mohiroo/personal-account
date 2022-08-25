import { RightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useState } from "react";
import "./ContactItem.scss";

interface ContactItemProps {
  id: number;
  name: string;
  surname: string;
  telephone: string;
  email: string;
  description: string;
}

const ContactItem: React.FC<ContactItemProps> = ({
  id,
  name,
  description,
  email,
  surname,
  telephone,
}) => {
  const [descriptionMode, setdescriptionMode] = useState<boolean>(false);

  console.log(descriptionMode);

  return (
    <article className="contact-item">
      <div className="contact-item-info">
        <Button
          type="default"
          onClick={() => setdescriptionMode(!descriptionMode)}
          className="contact-item-button-description"
        >
          <RightOutlined />
        </Button>
        <p>{id}</p>
        <p>{name}</p>
        <p>{surname}</p>
        <p>{telephone}</p>
        <p>{email}</p>
      </div>
      {descriptionMode && <p>{description}</p>}
    </article>
  );
};

export default ContactItem;
