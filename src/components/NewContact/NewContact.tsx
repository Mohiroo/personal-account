import { Form, FormInstance, Input, Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React from "react";

interface NewContactProps {
  isVisible: boolean;
  form: FormInstance<any>;
  onOk: () => void;
  onCancel: () => void;
  onFinish: (data: NewContactState) => void;
}

export interface NewContactState {
  name: string;
  surname: string;
  tel: string;
  email: string;
  desc: string;
}

export const NewContact: React.FC<NewContactProps> = ({ isVisible, form, onCancel, onOk, onFinish }) => {
  const validTel = /^[0-9]{10}$/;
  const validEmail = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

  return (
    <Modal title="Новый контакт" visible={isVisible} onOk={onOk} onCancel={onCancel}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="name" label="Имя" rules={[{ required: true, message: "Введите имя" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="surname" label="Фамилия" rules={[{ required: true, message: "Введите фамилию" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="tel" label="Телефон" rules={[{ required: true, message: "Введите телефон", pattern: validTel }]}>
          <Input type="tel" maxLength={10} />
        </Form.Item>
        <Form.Item name="email" label="Почта" rules={[{ required: true, message: "Введите почту", pattern: validEmail }]}>
          <Input />
        </Form.Item>
        <Form.Item name="desc" label="Описание">
          <TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};
