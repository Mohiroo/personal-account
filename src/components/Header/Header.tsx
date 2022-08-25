import './Header.scss'
import React from 'react';
import { Button } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import { Link } from 'react-router-dom';

interface MyHeaderProps {
  auth: boolean
  onClick: React.MouseEventHandler<HTMLElement>
}

const MyHeader: React.FC<MyHeaderProps> = ({auth, onClick}) => {
  return (
    <Header>
        <Link to="/account">
          <Button type="primary">Контакты</Button>
        </Link>
        <Link to="/">
          <Button type="primary" ghost danger={auth} onClick={onClick}>
            {auth ? 'Выйти' : 'Войти'}
          </Button>
        </Link>
      </Header>
  );
};

export default MyHeader;