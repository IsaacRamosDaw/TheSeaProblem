import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "./components/landing/LandingPage";
import { useForm } from "react-hook-form";
import './App.css'

export const ReportForm = () => {
    console.log('ReportForm component is being rendered!');
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };  
    return (
        
        <div>
            <form id="report-form" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="location">Location:</label>
                    <input {...register("location", { required: true })} />
                    
                </div>

                <div>
                    <label htmlFor="description">Description:</label>
                    <input {...register("description", { required: true })} />
                </div>


                    <select {...register("pollution_type")}>
                    <option value="female">female</option>
                    <option value="male">male</option>
                    <option value="other">other</option>
                   </select>

                
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}


