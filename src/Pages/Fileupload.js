import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const config = require('../config.json')

//RFC
export default function FileUpload() {
    
    const [file,setFile] = useState('')
    const[data,setData] =useState({
        percent:0,
        loaded:false
    })

    let handleChange = (e)=>{
        console.log('Changed',e[0])
        setFile(e[0])
    }
    let uploadImage = async (e)=>{ 
        e.preventDefault();
        console.log('OKOKOK');

    
        let data = new FormData();
        data.append('files',file);
        try {
            setData({
                percent:0,
                loaded:true

            });
            let upload_response =   await axios({
                method: 'POST',
                url:`${config.dev_api_url}/api/upload`,
                data,
                onUploadProgress:(progress)=>{
                    console.log(progress);
                    setData({
                        loaded:true,
                        percent:Math.round(progress.loaded /progress.total*100)
                    })
                }
            })
            setData({
                loaded:false
            });
            toast("file upload succesfully")
  
          console.log('file upload response ',upload_response)
            
        } catch (error) {
            
        }



    }

    return (
        <>
            <div className="row">
                <div className="col-6 offset-3 pb-5">
                    <h1>File Upload using ReactJS and Axios</h1>
                    <form className="mt-5" onSubmit={(e)=>{ uploadImage(e) }}>
                        <div className="mb-3">
                            <label htmlFor="file" className="form-label">Upload File</label>
                            <input onChange={ (e)=>{ handleChange(e.target.files) } } type="file" accept="image/*" name="files" className="form-control" id="file"/>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                    {
                        data.loaded &&
                    
                    <div className="progress mt-3">
                   <div className="progress-bar" role="progressbar" style={{width: data.percent + '%'}} aria-valuenow={data.percent} aria-valuemin={0} aria-valuemax={100}>{data.percent}%</div>
               </div>
}

             <ToastContainer />
     </div>
    
                </div>
        
        </>
    );
}