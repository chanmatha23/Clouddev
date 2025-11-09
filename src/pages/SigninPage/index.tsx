import SigninForm from "../../components/SigninForm";
import logo from "../../assets/logo.png";
import DonatorsLogo from "../../assets/Donator.png";
import StramerLogo from "../../assets/StreamerLogo.png";

const SignPage = () => {
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
                <div className="flex-col mt-[20%] items-center px-8 md:px-16 hidden md:flex">
                    <div className="">
                        <div className="flex flex-col justify-center items-center">
                            <div className="flex justify-center items-center">
                                <div className="flex flex-col">
                                    <p className="text-white text-2xl md:text-5xl whitespace-nowrap mb-2">
                                        Welcome to
                                    </p>
                                    <p className="text-2xl md:text-5xl whitespace-nowrap text-[#08CB00]">
                                        Stream Boost
                                    </p>
                                </div>

                                <img
                                    className="w-full max-w-[150px] md:max-w-[200px] lg:max-w-[240px] h-auto"
                                    src={logo}
                                    alt="Logo"
                                />
                            </div>

                            <p className="text-white mt-4">
                                Create unforgettable streaming moments with
                                support from your fans
                            </p>
                        </div>
                    </div>

                    <div className="bg-white/30 backdrop-blur-md rounded-2xl shadow-lg py-8 flex  max-w-xl mt-12">
                        <div className="flex flex-col items-start space-x-4 justify-between">
                            <p className="absolute top-3 right-5 text-xl text-white font-extrabold mt-2">
                                For Donators
                            </p>
                            <div className="flex p-5 space-x-5 items-center ml-6 mr-6">
                                <div className="flex-shrink-0">
                                    <img
                                        src={DonatorsLogo} // 👉 เปลี่ยนเป็น path icon จริง
                                        alt="Donation Icon"
                                        className="w-20 h-20"
                                    />
                                </div>

                                <div>
                                    <p className="text-white">
                                        Support your favorite streamers in real
                                        time Send messages and gifts during live
                                        streams
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/30 backdrop-blur-md rounded-2xl shadow-lg py-8 flex  max-w-xl mt-6">
                        <div className="flex flex-col items-start space-x-4 justify-between">
                            <p className="absolute top-3 right-5 text-xl text-white font-extrabold mt-2">
                                For Streamers
                            </p>
                            <div className="flex p-5 space-x-5 items-center ml-6 mr-6">
                                <div className="flex-shrink-0">
                                    <img
                                        src={StramerLogo} // 👉 เปลี่ยนเป็น path icon จริง
                                        alt="Donation Icon"
                                        className="w-20 h-20"
                                    />
                                </div>

                                <div>
                                    <p className="text-white">
                                        Create your own streaming channel
                                        Receive donations and live messages from
                                        your viewers
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                                                        <p className="text-white mt-8">Choose your role below to start your journey on our platform</p>

                </div>

                {/* ฝั่งขวา */}
                <div className="w-full flex justify-center items-center px-8 md:px-16">
                    <SigninForm />
                </div>
            </div>
        </div>
    );
};

export default SignPage;
