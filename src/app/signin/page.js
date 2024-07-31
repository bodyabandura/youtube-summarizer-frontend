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
      .post(`${BackendBaseURL}/user/signin`, {
        email,
        password,
      })
      .then((res) => {
        console.log(res.data);
        alert("Success");
        setAuthentication(res.data);
        router.push("/");
      })
      .catch((err) => {
        alert("failed");
      });
  };

  return (
    <div className="w-full flex flex-col items-center mt-24">
      <div className="mt-2">
        <Card className="w-96">
          <CardHeader className="mb-4 bg-[#004225] grid h-28 place-items-center">
            <Typography variant="h3" color="white">
              Sign In
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
              Sign In
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don&apos;t have an account?
              <Typography
                as="a"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold cursor-pointer"
                onClick={() => router.push("/signup")}>
                Sign up
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
