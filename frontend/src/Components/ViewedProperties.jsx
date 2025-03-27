import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../url";

const ViewedProperties = ({ userId }) => {
    const [viewedProps, setViewedProps] = useState([]);
    const [msg,setMsg] = useState("")
    const token = localStorage.getItem("token");

    useEffect(() => {
        axios.get(`${BASE_URL}api/buyer/view/${userId}`,{
            headers: { Authorization: `Bearer:${token}` },
        })
            .then(res => setViewedProps(res.data))
            .catch(err => {
                if(err.status == 404){
                    setMsg("No viewed properties found")
                }
                console.error("Error fetching viewed properties", err.message)
            });
    }, [userId]);

    return (
        <div>
            <h2 className="text-2xl font-bold">Viewed Properties</h2>
            <ul>
                {viewedProps.map(prop => (
                    <li key={prop.id} className="p-2 border-b">{prop.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ViewedProperties;
