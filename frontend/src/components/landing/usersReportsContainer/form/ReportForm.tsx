import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { createReport } from "../../../../services/reports";
import type { Report } from "@/shared/types/db-models";
import { ReportSchema } from "../../../../../../shared/schemas/report-schema";
import s from './reportForm.module.scss'

export const ReportForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [formData, setFormData] = useState<Partial<Report>>({});

  const handleOnChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const target = e.target;
    const { name, value } = target;
    if (!name || !target) return;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
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

    if (!res.success) return;

    const report = res.data;

    try {
      const result = await createReport(report);

      reset();

      window.location.reload();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <div>
      <form className={s.reportForm} onSubmit={handleSubmit(onSubmit)}>
        <div className="user">
          <input
            {...register("user", {
              required: true,
              maxLength: 20,
              pattern: /^[A-Za-z\s]+$/i,
            })}
            placeholder={"user"}
          />
          {errors.user?.type === "required" && "Needs to be filled out"}
          {errors.user?.type === "pattern" && "Only letters allowed"}
        </div>

        <div className={s.location_and_pollution}>
          <div>
            <input
              {...register("location", {
                required: true,
                pattern: /^[A-Za-z\s]+$/i,
              })}
              placeholder={"location"}
            />
            {errors.location?.type === "required" && "Needs to be filled out"}
            {errors.location?.type === "pattern" && "Only letters allowed"}
          </div>

          <div className={s.description}>
            <input
              {...register("description", {
                required: true,
                pattern: /^[A-Za-z\s]+$/i,
              })}
              placeholder={"description"}
            />
            {errors.description?.type === "required" &&
              "Needs to be filled out"}
          </div>

          <div className="shortdescription">
            <input
              {...register("shortDescription", { required: true })}
              placeholder={"description"}
            />
            {errors.shortDescription?.type === "required" &&
              "Needs to be filled out"}
          </div>

          <div className="Date">
            <input
              {...register("date", { required: true })}
              placeholder={"date"}
            />
            {errors.date?.type === "required" && "Needs to be filled out"}
          </div>

          <div className={s.pollution_type}>
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
};
