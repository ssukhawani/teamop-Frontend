import React, { useEffect } from "react";
import Lottie from "react-lottie";
import { useNavigate } from "react-router-dom";
import confetti from "./confetti.json"
import success from "./succes.json"




function BookingSucess() {
    const navigate = useNavigate()

    useEffect(() =>{
        setTimeout(() =>navigate("/home"),5000)
      // eslint-disable-line
    },[])

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: confetti,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const defaultOptions2 = {
    loop: false,
    autoplay: true,
    animationData: success,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="h-screen relative">
      <Lottie options={defaultOptions} height={600} width={400} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <Lottie options={defaultOptions2} height={300} width={300} />
      </div>
    </div>
  );
}

export default BookingSucess;
