"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import cookie from "js-cookie";
// import PassGuard from "@/components/Guardx";
import toast, { Toaster } from "react-hot-toast";
import { Spinner } from "@material-tailwind/react";
import axios from "axios";
import { isLogin } from "../utils/auth";
import { BackendBaseURL } from "../utils/constant";
import Link from "next/link";
export default function Home() {
  useEffect(() => {
    const authenticate = async () => {
      if (await isLogin()) {
        router.push("/");
      } else {
        router.push("/signin");
      }
    };
    // authenticate();
    // const email = cookie.get("email");
    // getAllTitle(email);

    cookie.set("token", "123@123.com", { expires: 1 });
    cookie.set("email", "123@123.com", { expires: 1 });
    const email = cookie.get("email");
    // getAllTitle(email);
  }, []);

  const getAllTitle = (email) => {
    axios
      .post(`${BackendBaseURL}getAllTitle`, {
        email,
      })
      .then((res) => {
        console.log(res.data.data);
        setSummaryData(res.data.data);
      })
      .catch((err) => {
      });
  };

  const [youtubeURL, setYoutubeURL] = useState("");
  const [summaryData, setSummaryData] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const router = useRouter();


  const addSummary = () => {
    setIsloading(true);
    if (youtubeURL.indexOf("https://") == -1) {
      alert("Input correct youtube url first");
      setIsloading(false);
      return;
    }
    axios
      .post(`${BackendBaseURL}getTitle`, {
        url: youtubeURL,
      })
      .then((res) => {
        setIsloading(false);
        const updatedData = summaryData.concat(res.data);
        setSummaryData(updatedData);
      })
      .catch((err) => {
        setIsloading(false);
        alert(`err: ${err}`);
      });
  };


  const getSummary = () => {
    setIsloading(true);
    if (youtubeURL.indexOf("https://") == -1) {
      alert("Input correct youtube url first");
      setIsloading(false);
      return;
    }
    axios
      .post(`${BackendBaseURL}getSummary`, {
        url: youtubeURL,
        email: cookie.get("email"),
      })
      .then((res) => {
        setIsloading(false);
        const updatedSummarydata = summaryData.concat(res.data);
        setSummaryData(updatedSummarydata);
      })
      .catch((err) => {
        setIsloading(false);
        alert(`err: ${err}`);
      });
  };

  return (
    <div className="min-h-[80vh] py-8 px-[5%]">
      <Toaster position="top-right" />
      <div className="flex justify-center">
        <input
          onChange={(e) => {
            setYoutubeURL(e.target.value);
          }}
          className="w-[50%] dark:bg-zinc-800 dark:text-white rounded-3xl border border-green-500 w-full px-4 py-2"
          type="text"
          name="URL"
          placeholder="URL"
        />
      </div>

      <div className="flex justify-center">
        <button
          disabled={isloading}
          onClick={() => addSummary()}
          className=" mt-8 flex justify-center items-center bg-green-400 hover:bg-green-300 transition-all rounded-full px-6 py-3 gap-2 w-fit  dark:border-white">
          {isloading ? (
            <Spinner />
          ) : (
            <Image
              src={"/images/add.svg"}
              width={30}
              height={30}
              alt="add icon"
            />
          )}

          <span className="dark:text-black">Summarize</span>
        </button>
      </div>

      <div className="mt-16 px-8 ">
        <p className="text-[30px]">Summary:</p>
        <div className="px-16 ">
          {summaryData.map((summary, index) => {
            return (
              <div className="mt-2" key={index}>
                {/* <Link
                  className=" text-[20px] text-blue-500 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 hover:underline"
                  href={`/summary?email=${cookie.get("email")}&title=${
                    summary.video_title
                  }`}
                  target="_blank">
                  {index + 1} &nbsp;
                  <strong>Title:&nbsp;</strong> {summary.video_title}
                </Link> */}
                <Link
                  className=" text-[20px] text-blue-500 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 hover:underline"
                  href={`/summary/${summary.url}`}
                  target="_blank">
                  {index + 1} &nbsp;
                  <strong>Title:&nbsp;</strong> {summary.video_title}
                </Link>
                {/* <a
                  className=" text-[20px] text-blue-500 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 hover:underline"
                  onClick={() => {
                    console.log(cookie.get("email"));
                    const userEmail = cookie.get("email");
                    router.push(
                      `/summary?email=${userEmail}&title=${summary.video_title}`
                    );
                  }}>
                  {index + 1} &nbsp;
                  <strong>Title:&nbsp;</strong> {summary.video_title}
                </a> */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
