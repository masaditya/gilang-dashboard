import useAuthAdmin from 'internal/base/middleware/authAdmin'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const AdminPage: NextPage = () => {
  return (
    <div>
        <h1>Admin Page</h1>
    </div>
  )
}

export default useAuthAdmin(AdminPage)
