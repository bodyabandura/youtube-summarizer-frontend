import { GoogleTagManager } from "@next/third-parties/google";
import htmlReactParser from 'html-react-parser';
export async function generateStaticParams() {
  try {
    const response = await fetch("http://139.59.8.17:5000/users/getAllTitle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: "123@123", url: "https://www.youtube.com/watch?v=5qm8PH4xAss" }),
    });

    const data = await response.json();

    // console.log("data ================================", data);

    if (!Array.isArray(data)) {
      throw new Error("Expected data to be an array");
    }

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

async function getData(url) {
  try {
    const response = await fetch("http://139.59.8.17:5000/users/getSummaryData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: "123@123.ua", url: url }),
    });
    const data = await response.json();

    // console.log("data ================================", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return false;
  }
}

export default async function Summary(props) {
  try {
    const baseUrl = props.params.slug.map(decodeURIComponent).join('/').replace(':/', '://');

    const queryString = new URLSearchParams(props.searchParams).toString();

    const fullUrl = `${baseUrl}?${queryString}`;

    const data = await getData(fullUrl);

    if (!data) {
      throw new Error("No data received");
    }

    const title = String(data[0]);
    return (
      <div className="w-full flex flex-col items-center mt-10 px-[5%] min-h-[70vh]">
        <GoogleTagManager gtmId="GTM-PW5F742Z" />
        <div className="flex flex-col items-center">
          <h1 className="font-semibold text-[25px]">
            {data.data.video_title}
          </h1>
          <img
            src={data.data.thumbnail}
            width={400}
            height={300}
            className="my-4"
            alt="Video Thumbnail"
          />
        </div>
        <div className="mt-4 ml-4">
          <a href={data.data.url}>Video Link</a>
        </div>

        <div className="p-5">
          <h3 className="text-[20px]">Summary:</h3>
          <p>{data.data.content}</p>
        </div>

      </div>
    );
  } catch (error) {
    console.error("Error in Summary component:", error);
    return <div>Error loading summary</div>;
  }
}

