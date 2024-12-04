import React, { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { database } from "./firebase";

function CoolerData() {
    const [dataList, setDataList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dbRef = ref(database, "coolerData"); // Correct Firebase path
                const snapshot = await get(dbRef);

                if (snapshot.exists()) {
                    const data = snapshot.val();
                    console.log("Raw data fetched from Firebase:", data);

                    const temperatureData = data?.temperature || {};
                    const timestampData = data?.timestamp || {};

                    console.log("Temperature Data:", temperatureData); // Log temperature data
                    console.log("Timestamp Data:", timestampData); // Log timestamp data

                    const temperatureKeys = Object.keys(temperatureData);
                    const timestampKeys = Object.keys(timestampData);

                    console.log("Temperature Keys:", temperatureKeys); // Log the keys
                    console.log("Timestamp Keys:", timestampKeys); // Log the keys

                    // Pair temperatures with corresponding timestamps based on their order
                    const pairedData = temperatureKeys.map((key, index) => {
                        const temperature = temperatureData[key];
                        const timestampKey = timestampKeys[index];
                        const timestamp =
                            timestampData[timestampKey] ||
                            "No timestamp available";
                        return { temperature, timestamp };
                    });

                    console.log("Paired Data:", pairedData); // Log the paired data

                    // Sort by timestamp (assuming timestamp is a valid date string)
                    const sortedData = pairedData.sort((a, b) => {
                        const dateA = new Date(a.timestamp);
                        const dateB = new Date(b.timestamp);
                        return dateB - dateA; // Newest first
                    });

                    setDataList(sortedData);
                } else {
                    console.log("No data available");
                }
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Cooler Data</h2>
            {dataList.length > 0 ? (
                <ul>
                    {dataList.map((data, index) => (
                        <li key={index}>
                            <p>Temperature: {data.temperature}°F</p>
                            <p>Timestamp: {data.timestamp}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No Data available</p>
            )}
        </div>
    );
}

export default CoolerData;
