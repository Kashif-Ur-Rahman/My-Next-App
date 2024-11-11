import React from 'react';

// TypeScript interface that defines the shape of an object...
interface DataType {
    message?: string;    // It is Optional, If it exists, the value must be a string..
    [key: string]: any; // Use a more flexible type here based on the actual API response.
}

interface DataProps {
    data: DataType;
}

const Home = ({ data }: DataProps) => {
    return (
        <div>
            <h1>Welcome to Next.js with SSR</h1>
            {data.message ? (
                <p>{data.message}</p>
            ) : (
                <pre>{JSON.stringify(data, null, 2)}</pre> // Display the data or specific fields.. preformatted tag displays the data as it is.
            )}
        </div>
    );
};
// This function runs on every request...
export async function getServerSideProps() {
    try {
        // Fetch data from an external API...
        const res = await fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions.min.json');
        if (!res.ok) {
            throw new Error("Failed to fetch data.");
        }
        const data = await res.json();

        return {
            props: {
                data,
            },
        };
    } catch (error) {
        console.error(error);
        return {
            props: {
                data: { message: "Error fetching data." },
            },
        };
    }
}

export default Home;
