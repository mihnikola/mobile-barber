import React from 'react'
import ChangePass from "@/components/changePass"
import withSafeArea from '@/components/wrapper/WrapperSafeArea';
const changePassword = () => {
  return (
    <ChangePass />
  )
}

export default withSafeArea(changePassword);
