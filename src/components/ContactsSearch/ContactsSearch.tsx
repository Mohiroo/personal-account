import { SearchOutlined } from "@ant-design/icons";
import { Input, Select } from "antd";
import React, { ChangeEventHandler } from "react";
import "./ContactsSearch.scss";

interface ContactsSearchProps {
  onSelect: (select: string) => void;
  onChangeQuery: ChangeEventHandler<HTMLInputElement>;
}

const ContactsSearch: React.FC<ContactsSearchProps> = ({ onSelect, onChangeQuery }) => {
  const { Option } = Select;

  return (
    <Input.Group className="contacts-search">
      <Select defaultValue="none" onChange={onSelect}>
        <Option value="none" disabled>
          Поиск по
        </Option>
        <Option value="name">Имени</Option>
        <Option value="surname">Фамилии</Option>
        <Option value="tel">Телефону</Option>
        <Option value="email">Почте</Option>
      </Select>
      <Input placeholder="Поиск..." defaultValue="" onChange={onChangeQuery} prefix={<SearchOutlined />} />
    </Input.Group>
  );
};

export default ContactsSearch;
