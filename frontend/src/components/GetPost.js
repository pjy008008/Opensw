import React, { useState, useEffect } from "react";
import axios from "axios";
const GetPost = () => {
  const [post, setPost] = useState([]);
  // const res = await fetch("http://127.0.0.1:8000/api/grade");
  //       const data = await res.json();
  //       setPosts(data);
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token)
    axios.get("http://127.0.0.1:8000/api/", {
      headers: { Authorization: `Token ${token}` },
    }).then(function(response){
      console.log(response)
    }).catch(function(error){
      console.log(error);
    })
  }, []);

  return <div></div>;
};

export default GetPost;
