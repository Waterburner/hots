import React, { useEffect, useState } from "react";
import database from "./firebase";

const CoolerDataLocal = () => {
    const [temperature, setTemperature] = useState(null);

    useEffect(() => {
        // Listen to data from Firebase
        database.ref("coolerData/temperature").on("value", (snapshot) => {
            const temp = snapshot.val();
            setTemperature(temp);
        });
    }, []);

    const sendTemperature = (temp) => {
        // Push temperature data to Firebase
        database.ref("coolerData/temperature").set(temp);
    };

    return (
        <div>
            <h1>Temperature: {temperature ? temperature : "Loading..."}</h1>
            <button onClick={() => sendTemperature(72)}>Set Temperature</button>
        </div>
    );
};

export default CoolerDataLocal;
