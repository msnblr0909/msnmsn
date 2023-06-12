import React, { useState, useEffect } from "react";
import "./Json.css";

function JsonServer() {
  const [data, setData] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [party, setParty] = useState("");
  useEffect(() => {
    getUser();
  }, []);
  function getUser() {
    fetch("http://localhost:4000/users").then((result) => {
      result.json().then((resp) => {
        setData(resp);
        setName(resp[0].name);
        setMobile(resp[0].mobile);
        setParty(resp[0].party);
        // console.log(resp);
      });
    });
  }
  function Handler(e) {
    console.log({ name });
    alert("successfull");
    let data1 = { name, mobile, party };
    //Create user list
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
  //Delete  user list
  function deleteUsers(id) {
    fetch(`http://localhost:4000/users/${id}`, {
      method: "DELETE",
    }).then((result2) => {
      result2.json().then((resp2) => {
        console.warn(resp2);
        getUser();
      });
    });
  }
  function selectUsers(id) {
   console.warn(data[id-1])
    let item1 = (data[id-1]);
    setName(item1.name);
    setMobile(data[id-1].mobile);
    setParty(data[id-1].party);

  }

  return (
    <>
      <h1>MSN REGISTER TABLE</h1>
      <div className="reg_box">
        <div className="reg_form">
          <h4>Registration Form</h4>
          <label style={{ padding: "10px" }}>Name:</label>
          <input
            className="inpt"
            type="name"
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <br /> <br />
          <label style={{ padding: "10px" }}>Mobile:</label>
          <input
            className="inpt-one"
            type="name"
            name="name"
            value={mobile}
            onChange={(e) => {
              setMobile(e.target.value);
            }}
          />
          <br /> <br />
          <label style={{ padding: "10px" }}>Party:</label>
          <input
            style={{ position: "relative", left: "12%", padding: "3px" }}
            type="name"
            name="name"
            value={party}
            onChange={(e) => {
              setParty(e.target.value);
            }}
          />
          <br />
          <br />
          <br />
          <br />
          <button
            style={{
              position: "relative",
              /* right: -131px; */
              left: "157px",
              top: "-13px",
              width: "90px",
            }}
            onClick={Handler}
          >
            Submit
          </button>
        </div>
        <div className="tblstyle">
          <table border="1">
            <tr>
              <td>ID</td>
              <td>Name</td>
              <td>Mobile</td>
              <td>Operation</td>
              <td>Party</td>
            </tr>
            {data &&
              data.map((item, i) => (
                <tr key={i}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.mobile}</td>
                  <td>{item.party}</td>
                  <td>
                    <button onClick={() => deleteUsers(item.id)}>Delete</button>
                  </td>
                  <td>
                    <button onClick={() => selectUsers(item.id)}>Update</button>
                  </td>
                </tr>
              ))}
          </table>
        </div>
        <div className="select-box">
          <input type="text" value={name} />
          <input type="text" value={mobile} />
          <input type="text" value={party} />
        </div>
      </div>
    </>
  );
}

export default JsonServer;
