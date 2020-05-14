import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik'
import {  Table } from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'
import { getHobbiesOfUser } from "../../services/hobbyService";
import { saveHobby, deleteHobby } from './../../services/hobbyService';

let initialValues = {
  hobby: '',
  passion: 'Low',
  year: ''
}

const HobbyTable = ({userId}) => {

  const [hobbies, setHobbies] = useState([{}]);
  // const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
      getHobbiesOfUser(userId)
          .then((data) => {
            console.log("Hobbies*****",data.data)
            setHobbies(data.data)
          });
  }, [userId]);

  const deleteValue=(index)=>{
    deleteHobby(index).then(value=>{
      toast.success("Hobby Deleted!", {
        position: "top-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        })
        getHobbiesOfUser(userId)
        .then((data) => {
          console.log("Hobbies*****",data.data)
          setHobbies(data.data)
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
  }


  return ( 
    <>
      <section id="hobby-table">
        <Table responsive>
          <thead>
            <tr>
              <th>Passion</th>
              <th>Hobby</th>
              <th>Year</th>
              <th>Delete</th>
            </tr>
          </thead>
            {hobbies ? hobbies.map((hobby, i) => {
              return(<tbody>
                {hobby.hobby ?
                  <tr>
                  <td>{hobby.passion}</td>
                  <td>{hobby.hobby}</td>
                  <td>{hobby.year}</td>
                  <td>
                    <button
                      type='submit'
                      onClick={()=>deleteValue(hobby._id)}
                      className='btn-dlt'
                    >
                      Remove
                    </button>
                    <ToastContainer />
                  </td>
                </tr>
                  : null}
          </tbody>)
            }
            ): null}
        </Table>

        <Formik
          initialValues={initialValues}
          onSubmit={values => {
            console.log("VALUES::::::", values)
            values.userId = userId;
            saveHobby(values).then(()=>{
              toast.success("Hobby Added!", {
                position: "top-right",
                autoClose: 1200,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                })
                getHobbiesOfUser(userId)
                .then((data) => {
                  console.log("Hobbies*****",data.data)
                  setHobbies(data.data)
                });
            }).catch(err=>{
              console.log(err)
              toast.error("Something went wrong")
            })
          }}
        >
          {({ errors, touched, values, handleSubmit }) => (
            <Form
              translate="yes"
            >
              <div className='form-container form-row mt-3'>
                <div className='col-3 ml-1 mr-1'>
                <Field as="select" name="passion" placeholder="Select Passion Value">
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </Field>
              </div>
              <div className='col-3 ml-1 mr-1'>
                <Field
                  type="text"
                  name='hobby'
                  placeholder='Enter Hobby'
                />
              </div>
              <div className='col-3 ml-1 mr-1'>
                <Field
                  name='year'
                  placeholder='Enter Year'
                />
              </div>
              <div className='col-2 ml-0 pl-0'>
                <button
                  type='submit'
                  onClick={()=>handleSubmit}
                  className='btn-submit'
                >
                  Add
                </button>
            </div>
            </div>
        </Form>
        )}
      </Formik>
      </section>
    </>
   );
}
 
export default HobbyTable;