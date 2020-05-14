import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik'
import {Table} from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HobbyTable from "../hobbyTable";
import { getUsers, register } from './../../services/userService';
import './index.css'

let initialValues = {
  hobby: '',
  passion: 'Low',
  year: ''
}

const UserTable = () => {

  const [users, setUsers] = useState([{}]);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
      getUsers()
          .then((data) => {
            console.log("DATA*****",data)
            setUsers(data.data)
          });
  }, []);

  const onUserSelect=(id)=>{
    console.log("User id: ", id)
    setSelectedUser(id)
  }
  
  return ( 
    <>
    <section id="user-table">
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <div className="row">
              <div className="col-12">
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                {users ? users.map((user, i) => {
                  return(
                    <tr onClick={() => onUserSelect(user._id)} key={user._id}>
                      <td>{user.username}</td>
                    </tr>
                  )}
                ): null}
              </tbody>
            </Table>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
            <Formik
          initialValues={initialValues}
          onSubmit={values => {
            console.log("VALUES::::::", values)
            register(values).then(()=>{
              toast.success("User Added!", {
                position: "top-right",
                autoClose: 1200,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                })
                getUsers()
                .then((data) => {
                  setUsers(data.data)
                });
            }).catch(err=>{
              console.log(err)
              toast.error("Something went wrong", {
                position: "top-right",
                autoClose: 1200,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                })
            })
          }}
        >
          {({ errors, touched, values, handleSubmit }) => (
            <Form
              translate="yes"
            >
              <div className='form-container form-row mt-3'>

              <div className='col-6'>
                <Field
                  type="text"
                  name='username'
                  placeholder='Enter Username'
                />
              </div>
              <div className='col-6'>
                <button
                  type='submit'
                  onClick={()=>handleSubmit}
                  className='btn-add'
                >
                  Add User
                </button>
            </div>
            </div>
        </Form>
                )}
        </Formik>
              </div>
            </div>
            <ToastContainer />

          </div>
          <div className="col-md-8">
            <HobbyTable userId={selectedUser}/>
          </div>
        </div>
      </div>
    </section>
    </>
   );
}
 
export default UserTable;