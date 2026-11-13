import React from 'react'
import ChangePass from "@/components/changePass"
import { withScreen } from "@/components/ui";
const changePassword = () => {
  return (
    <ChangePass />
  )
}

export default withScreen(changePassword);
