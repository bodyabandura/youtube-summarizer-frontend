"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { isLogin, logOut, setAuthentication } from "../../utils/auth";
import { useEffect, useState, useRef } from "react";
import { BackendBaseURL } from "../../utils/constant";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    axios
      .post(`${BackendBaseURL}/user/signup`, { email, password })
      .then((res) => {
        // setAuthentication(res.data.token);
        alert("success");
        router.push("/signin");
      })
      .catch((err) => {
        console.log(err);
        alert("failed");
      });
  };
  // useEffect(() => {
  //   const authenticate = async () => {
  //     if (await isLogin()) {
  //       router.push("/");
  //     } else {
  //       router.push("/signup");
  //     }
  //   };
  //   authenticate();
  // }, []);

  return (
    <div className="w-full flex flex-col items-center mt-24">
      <div className="mt-2">
        <Card className="w-96">
          <CardHeader className="mb-4 bg-[#004225] grid h-28 place-items-center">
            <Typography variant="h3" color="white">
              Sign Up
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              className="focus:ring-transparent"
              label="Email"
              size="lg"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              className="focus:ring-transparent"
              label="Password"
              size="lg"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              className="bg-[#004225]"
              fullWidth
              onClick={() => {
                handleSubmit();
              }}>
              Sign Up
            </Button>
            <Typography variant="small" className="mt-6 pr-8 flex justify-end">
              <Typography
                as="a"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold cursor-pointer"
                onClick={() => router.push("/signin")}>
                Sign In
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
