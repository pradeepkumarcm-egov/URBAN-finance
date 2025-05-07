
import React, { useState } from "react";


const ApplyCertificate = () => {
    const [formData, setFormData] = useState({});
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Form submitted:", formData);
    };
    
    return (
        <div>
        <h1>Apply for Certificate</h1>
        <form onSubmit={handleSubmit}>
            <label>
            Name:
            <input type="text" name="name" onChange={handleChange} required />
            </label>
            <br />
            <label>
            Email:
            <input type="email" name="email" onChange={handleChange} required />
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
        </div>
    );
  
};

export default ApplyCertificate;


