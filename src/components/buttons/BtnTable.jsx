import React from 'react';
import BtnActions from './BtnActions';

export default function BtnTable({ action, to, onclick, title, funtion }) {
  return (
      <BtnActions action={action} to={to} onclick={onclick} title={title} funtion={funtion}/>
  );
}
