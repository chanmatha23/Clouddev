import LoginForm from "../../components/LoginForm";
import logo from "../../assets/logo.png";

const LoginPage = () => {
    return (
        <div className="relative w-screen h-screen overflow-auto">
            {/* พื้นหลัง gradient */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background:
                        "linear-gradient(135deg, #253900 29%, #000000 64%)",
                }}
            />
            {/* layer blur */}
            <div className="absolute inset-0 backdrop-blur-md z-0" />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 h-[90%]">
                <div className="hidden md:flex flex-col mt-[20%] items-center px-8 md:px-16 space-y-20">
                    <img
                        className="w-full max-w-[200px] md:max-w-[280px] lg:max-w-[320px] h-auto"
                        src={logo}
                        alt="Logo"
                    />
                    <div className="space-y-2">
                        <p className="text-white text-2xl md:text-4xl">
                            Let's make
                        </p>
                        <p className="text-white text-5xl md:text-7xl font-bold">
                            Streaming
                        </p>
                        <p className="text-white text-2xl md:text-4xl">
                            more meaningful together
                        </p>
                    </div>
                </div>

                {/* ฝั่งขวา */}
                <div className="w-full flex justify-center items-center px-8 md:px-16">
                    <LoginForm />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
