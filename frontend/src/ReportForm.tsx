import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "./components/landing/LandingPage";
import { useForm } from "react-hook-form";
import React, { useState } from 'react';
import { createReport } from "./services/reports";
import type {Report } from "@/shared/types/db-models";
import { ReportSchema } from "../../shared/schemas/report-schema";


export const ReportForm = () => {
    console.log('ReportForm component is being rendered!');
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [formData,setFormData] = useState<Partial<Report>>({
    })
    
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const target = e.target;
        const { name, value } = target;
        if (!name || !target) return;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
    }
   /* const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
    }
*/
    const onSubmit = async (data: Partial<Report>) => {
        const res = ReportSchema.safeParse(data);
        console.log(data)
        if(!res.success) return
        const report = res.data
        try {
            const result = await createReport(report);
            console.log("result");
            console.log(result);

            reset();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
      };
    return (
        
        <div>
            <form id="report-form" onSubmit={handleSubmit(onSubmit)}>

            <div className="user">
                    <label htmlFor="user">User:</label>
                    <input {...register("user", { required: true, maxLength: 20, pattern: /^[A-Za-z\s]+$/i })} value={formData.user || 'e'} />
                    {errors.user?.type === 'required' && "Needs to be filled out"}
                    {errors.user?.type === 'pattern' && "Only letters allowed"}
                </div>

                <div className="location-and-pollution">
                <div>
                    <label htmlFor="location">Location:</label>
                    <input {...register("location", { required: true,pattern: /^[A-Za-z\s]+$/i })} value={formData.location || 'e'} />
                    {errors.location?.type === 'required' && "Needs to be filled out"}
                    {errors.location?.type === 'pattern' && "Only letters allowed"}
                    
                </div>
                
                <div className="description">
                    <label htmlFor="description">Description:</label>
                    <input {...register("description", { required: true, pattern: /^[A-Za-z\s]+$/i })}  value={formData.description || 'e'} />
                    {errors.description?.type === 'required' && "Needs to be filled out"}
                </div>

                
                <div className="shortdescription">
                    <label htmlFor="shortdescription">shortDescription:</label>
                    <input {...register("shortDescription", { required: true})}  value={formData.shortDescription || 'e'}/>
                    {errors.shortDescription?.type === 'required' && "Needs to be filled out"}
                </div>

                <div className="Date">
                    <label htmlFor="Date">Date:</label>
                    <input {...register("date", { required: true })}  value={formData.date || 'e'}/>
                    {errors.location?.type === 'required' && "Needs to be filled out"}
                </div>

                <div className="pollution-type">
                <label htmlFor="pollutionType">pollutionType:</label>
                    <select {...register("pollutionType", { required: true })}>
                    <option value="Plastic">Plastic</option>
                    <option value="Oil Spill">Oil Spill</option>
                    <option value="Chemical">Chemical</option>
                   </select>
                   </div>
                   </div>

                
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}



