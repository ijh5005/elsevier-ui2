import React, { useState, useEffect } from 'react';
import './App.css';
import axios from "axios";

import Table from "./components/Table";
// axios.defaults = "http://localhost:8080";
// console.log(axios.defaults)

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 60 * 1000 * 4
});

// const getInitialResults = async () => {
//   return await axiosInstance({
//     method: "get",
//     url: "/",
//     timeout: 60 * 4 * 1000
//   });
// }

const filter = (filters, resourceText) => {
  axiosInstance.get("/filter", {
    filters,
	  resourceText
  })
}

const App = () => {
  
  const [list, setList] = useState([]);
  const [resources, setResources] = useState([]);
  const heads = ["Clinical Status", "Date Recorded", "Verification Status", "Resource"]

  useEffect(() => {
    axiosInstance.get("/").then(results => {
      const {
        data
      } = results;
      const list = data.data.map(d => ({
        clinicalStatus: d.resource.clinicalStatus,
        dateRecorded: d.resource.dateRecorded,
        verificationStatus: d.resource.verificationStatus,
        resource: d.resource.code.text
      }));
      setList(list)
      setResources(data.data.map(d => d.resource.code.text))
    })
  }, []);

  const fetchData = (clinicalStatus, verificationStatus, resource) => {
    const obj = {
      "filters": [],
      "resourceText": ""
    }

    if(clinicalStatus){
      obj.filters.push(clinicalStatus)
    }

    if(verificationStatus){
      obj.filters.push(verificationStatus)
    }

    if(resource){
      obj.filters.push("resource");
      obj.resourceText = resource;
    }

    axiosInstance.post("/filter", obj).then(results => {
      const {
        data
      } = results;
      const list = data.data.map(d => ({
        clinicalStatus: d.resource.clinicalStatus,
        dateRecorded: d.resource.dateRecorded,
        verificationStatus: d.resource.verificationStatus,
        resource: d.resource.code.text
      }));
      setList(list)
      setResources(data.data.map(d => d.resource.code.text))
    })
  }

  return (
    <div className="App">
      <Table list={list} heads={heads} resources={resources} fetchData={fetchData}/>
    </div>
  );
}

export default App;
