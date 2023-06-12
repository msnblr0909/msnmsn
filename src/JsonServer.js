import React, { useState, useEffect } from "react";
import "./Json.css";

function JsonServer() {
  const [data, setData] = useState("");
  const [name, setName] = useState("");
  const [mobile,setMobile]=useState("");
  useEffect(() => {
    getUser();
  }, []);
  function getUser(){
    fetch("http://localhost:4000/users").then((result) => {
      result.json().then((resp) => {
        setData(resp);
        // console.log(resp);
      });
    });
  }
  function Handler(e) {
    console.log({ name });
    alert("successfull");
    let data1 = { name,mobile };
    fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(data1),
    }).then((result1) => {
      result1.json().then((resp1) => {
        console.warn("resp1", resp1);
      });
    });
    // function searchdata1(){
    //   let abc = console.log("name");
    //   alert(abc);
    // }
  }
  function deleteUsers(id)
  {
fetch(`http://localhost:4000/users/${id}`,{

method:"DELETE"
  }).then((result2)=>{
  result2.json().then((resp2)=>{
console.warn(resp2);
getUser();
  })
})
}

  
  return (
    <>

    <h1>MSN REGISTER TABLE</h1>
      <div className="reg_form">
        <label>Name:</label>
        <input className="inpt"
          type="name"
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <br/> <br/>
          <label>Mobile:</label>
        <input className="inpt-one"
          type="name"
          name="name"
          value={mobile}
          onChange={(e) => {
            setMobile(e.target.value);
          }}
        />
        <br />
        <br />
        <button style={{position: "relative",
    /* right: -131px; */
    left: "157px", top:"-13px",
    width: "90px"}} onClick={Handler}>Submit</button>
      </div>
      <div className="tblstyle">
        <table border="1">
          <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Mobile</td>
            <td>Operation</td>
          </tr>
          {data &&
            data.map((item,i) => 
              <tr key={i}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.mobile}</td>
                <td><button onClick={()=>deleteUsers(item.id)}>Delete</button></td>
              </tr>
            )}
        </table>
      </div>
    </>
  );
}

export default JsonServer;
