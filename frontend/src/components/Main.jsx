import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
// import { io } from "socket.io-client";
import axios from "axios";
const Main = () => {

  const [msg, setMsg] = useState("")
  const navigate = useNavigate();

  const handleAlert = async () => {
    setMsg("Alert");
    try {
      const resp = await axios.post(`/api/alert/${msg}`);
      console.log("Resp = ", resp);
    } catch (error) {
      console.log("Error ", error);
    }
  }
  
  return (
    <div>
      <div className='bg-slate-900 text-white font-light flex flex-col justify-center items-center h-screen '>
        <button onClick={() => navigate("/weatherData")} className='bg-slate-700 py-2 px-4 my-2 text-lg rounded-lg w-[20%]'>check Real-Time Wheather</button>
        <button onClick={() => navigate("temp-humidity")} className='bg-slate-700 py-2 px-4 my-2 text-lg rounded-lg w-[20%]'>Humidity And Temperature</button>
        <button onClick={() => navigate("/airQuality")} className='bg-slate-700 py-2 px-4 my-2 text-lg rounded-lg w-[20%]'>Air Quality</button>
        <button onClick={handleAlert} className='bg-slate-700 py-2 px-4 my-2 text-lg rounded-lg w-[20%]'>Send alert</button>
      </div>
    </div>
  )
}

export default Main
