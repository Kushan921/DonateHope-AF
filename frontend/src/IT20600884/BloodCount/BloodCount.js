import React, { useEffect, useState } from 'react'
import home2 from "../../IT20620202/UserView/images/Homepage1.jpg"
import A_positive from "../Images/A+.jpg"
import axios from 'axios'
import { toast } from "react-toastify";



function BloodCount() {

    const [blood,setBlood] = useState([])

    useEffect(() => {
        axios
          .get("http://localhost:8020/blood/")
          .then((response) => {
            if (response) {
              setBlood(response.data);
            } else {
              toast.error("Error While Fetching Data!!");
            }
          })
          .catch((error) => toast.error(error));
      },[]);
    

  return (
    <div className='ml-15'>
    <div className="w-full bg-gray-100 py-10 text-center">
      <h1 className="text-2xl">Blood Counts</h1>
    </div>
    <div className='flex flex-wrap gap-20 ml-24 mt-10'>
      {blood.map((item, index) => (
        <div className="bg-red-700 w-1/6 rounded-2xl overflow-hidden" key={index}>
          <div className="shadow-md">
            <h1 className="text-3xl font-semibold mb-4 mt-5 text-center text-white">{item.blood_type}</h1>
            <div className="p-5">
              <h5 className="text-2xl font-semibold mb-4 text-center text-white">{item.total_count}&nbsp;&nbsp;Pints</h5>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  
  )
}

export default BloodCount
