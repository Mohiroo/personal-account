import { Button, Form, Result, Skeleton } from "antd";
import { useState } from "react";
import ContactList from "../../components/ContactList/ContactList";
import ContactsSearch from "../../components/ContactsSearch/ContactsSearch";
import { NewContact, NewContactState } from "../../components/NewContact/NewContact";
import NotificationItem from "../../components/NotificationItem/NotificationItem";
import { fakeData } from "../../content/fakeData";
import { useAppSelector } from "../../hooks/redux";
import { useSortedContacts } from "../../hooks/useSortedContacts";
import { IContacts } from "../../model/IContacts";
import { UserAPI } from "../../store/API/UserAPI";
import "./Account.scss";

const Account = () => {
  const { user, userId } = useAppSelector((state) => state.authReducer);
  const [form] = Form.useForm();

  const { data, isLoading, isError, isSuccess } = UserAPI.useGetContactsQuery(userId);
  const [PUTContact, { isError: isErrorUpdate }] = UserAPI.useEditContactMutation();
  const [DELETEContact, { isError: isErrorDelete }] = UserAPI.useDeleteContactMutation();
  const [POSTContact, { isError: isErrorAdd }] = UserAPI.useAddContactMutation();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [searchMode, setSearchMode] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const sortedContacts = useSortedContacts(data || [], searchQuery, searchMode);

  const updateContact = (contact: IContacts) => PUTContact(contact);
  const deleteContact = (contact: IContacts) => DELETEContact(contact.id);
  const addContact = (data: NewContactState) => {
    POSTContact({
      userId: userId,
      name: data.name,
      surname: data.surname,
      tel: data.tel,
      email: data.email,
      description: data.desc || "",
    } as IContacts);
    hideContactModal();
  };
  const addFakeContacts = () => {
    fakeData(userId).forEach(async (contact) => {
      await POSTContact(contact);
    });
  };

  const acceptContactModal = () => form.submit();
  const hideContactModal = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div>
      <h1 className="account-title">Ваши контакты, {user}</h1>
      {isLoading && <Skeleton active />}
      {<NotificationItem message={"Ошибка"} description={"Изменение не удалось"} isError={isErrorUpdate} />}
      {<NotificationItem message={"Ошибка"} description={"Удаление не удалось"} isError={isErrorDelete} />}
      {<NotificationItem message={"Ошибка"} description={"Контакт не добавлен"} isError={isErrorAdd} />}
      {isError && <Result status="500" title="500" subTitle="Видимо что-то пошло не так..." />}
      {isSuccess && (
        <>
          <ContactsSearch onSelect={setSearchMode} onChangeQuery={(e) => setSearchQuery(e.target.value)} />
          <div className="account-buttons">
            <Button type="primary" onClick={() => setIsModalVisible(true)}>
              Добавить контакт
            </Button>
            <Button type="primary" ghost onClick={addFakeContacts}>
              Готовые контакты
            </Button>
          </div>
          <ContactList contacts={sortedContacts} deleteContact={deleteContact} unpdateContact={updateContact} />
          <NewContact
            isVisible={isModalVisible}
            onCancel={hideContactModal}
            form={form}
            onOk={acceptContactModal}
            onFinish={addContact}
          />
        </>
      )}
    </div>
  );
};

export default Account;
