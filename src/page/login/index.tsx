import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, message } from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/config";
import { useNavigate } from "react-router-dom";

type FieldType = {
  email?: string;
  password?: string;
  remember?: boolean;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

export default function Login() {
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const email: string = values.email || "";
    const password: string = values.password || "";

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        window.localStorage.setItem("user", JSON.stringify(user));
        message.success("Hello, welcome to the admin panel of shop.co");
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        message.error(errorMessage);
      });
  };
  return (
    <>
      <div className="flex items-center gap-[110px] bg-[#060B26]">
        <div>
          <img
            className="w-[750px] h-[730px]"
            src="/Image.png"
            alt="rasm"
            width={700}
            height={600}
          />
        </div>
        <div>
          <div
            style={{ background: "#060B26", height: "100vh" }}
            className="flex flex-col items-center justify-center text-white"
          >
            <div className="text-white mb-[50px] text-center">
              <h2 className="text-3xl mb-2">Nice to see you!</h2>
              <p className="text-[#a1a0a0]">
                Enter your email and password to sign in
              </p>
            </div>
            <div
              style={{
                width: "350px",
                borderRadius: "15px",
                padding: "15px",
                paddingTop: "25px",
              }}
              className="flex items-center justify-center shadow-[0_2px_15px_0_rgba(255,0,255)]"
            >
              <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className="text-white"
              >
                <h1 className="text-3xl text-center my-5 mb-8">
                  Shop.co Admin
                </h1>
                <Form.Item<FieldType>
                  label={<h2 className="text-white">Username</h2>}
                  name="email"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item<FieldType>
                  label={<h2 className="text-white">Password</h2>}
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox className="text-white my-5">Remember me</Checkbox>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 80, span: 26 }}>
                  <Button
                    style={{ width: "100%" }}
                    type="primary"
                    htmlType="submit"
                  >
                    Sign in
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
