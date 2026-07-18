import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import userpng from "./photos/User.png";
import toast from "react-hot-toast";
import API from "../../../api";
import Head from "../Header/Header";
import Swal from "sweetalert2";

function AddAdmin() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email_address: "",
    mobile_no: "",
    SecAnswer: "",
    password: "",
    repassword: "",
    role: "admin",
  });

  const addAdmin = async (e) => {
    e.preventDefault();

    if (!data.first_name || !data.email_address || !data.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (data.password !== data.repassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await API.post("/api/auth/register", {
        first_name: data.first_name,
        last_name: data.last_name,
        email_address: data.email_address,
        mobile_no: data.mobile_no,
        password: data.password,
        SecAnswer: data.SecAnswer,
        role: data.role,
      });

      setData({
        first_name: "",
        last_name: "",
        email_address: "",
        mobile_no: "",
        SecAnswer: "",
        password: "",
        repassword: "",
        role: "admin",
      });

      await Swal.fire({
        icon: "success",
        title: "Success",
        text: res.data?.message || "Admin registered successfully!",
        confirmButtonColor: "#063a67",
        confirmButtonText: "Proceed",
      });

      navigate("/adminprofile");
    } catch (error) {
      const msg = error.response?.data?.message || "An error occurred during registration";
      toast.error(msg);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 font-sans">
      <Head />

      {/* Step 2 Scientist Structural Main Viewport Alignment */}
      <div className="ml-[290px] pt-8 px-8 pb-12 flex justify-center">
        <div className="w-full max-w-[900px] bg-white rounded-[20px] border-2 border-gray-100 shadow-xl p-8 transition-all">
          {/* Header Workspace Title Node */}
          <div className="mb-6">
            <p className="text-3xl font-extrabold text-[#063a67] m-0 tracking-tight">
              Add Academy Admin
            </p>
            <p className="text-xs text-gray-400 font-semibold tracking-wider mt-1 uppercase">
              Configure System Authorization Rights
            </p>
            <div className="w-full h-[3px] bg-gradient-to-r from-[#063a67] to-[#e6eff6] mt-3 rounded-full"></div>
          </div>

          {/* Meta Identity Banner Grid */}
          <div className="flex items-center gap-5 p-4 bg-[#e6eff6] rounded-xl border border-blue-100 mb-8">
            <div className="bg-white p-2 rounded-full border border-gray-200 shadow-sm">
              <img
                src={userpng}
                alt="User Avatar"
                className="w-[55px] h-[55px] object-contain"
              />
            </div>
            <div>
              <p className="text-lg font-bold text-[#063a67] m-0">
                System Authority Unit
              </p>
              <p className="text-xs text-gray-500 m-0">
                Assign credentials to scale secure portal operations
              </p>
            </div>
          </div>

          {/* Core Formulation Framework Layout */}
          <form onSubmit={addAdmin} className="space-y-6">
            {/* Row 1: First & Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[14px] font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                  First Name *
                </label>
                <input
                  type="text"
                  className="w-full p-3 border-2 border-gray-200 rounded-xl outline-none font-semibold text-gray-800 transition-all focus:border-[#063a67] focus:bg-white bg-gray-50"
                  value={data.first_name}
                  onChange={(e) => setData({ ...data, first_name: e.target.value })}
                  placeholder="First name"
                  required
                />
              </div>
              <div>
                <label className="block text-[14px] font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full p-3 border-2 border-gray-200 rounded-xl outline-none font-semibold text-gray-800 transition-all focus:border-[#063a67] focus:bg-white bg-gray-50"
                  value={data.last_name}
                  onChange={(e) =>
                    setData({ ...data, last_name: e.target.value })
                  }
                  placeholder="Last name"
                />
              </div>
            </div>

            <div className="w-full h-[1px] bg-gray-100 my-2"></div>

            {/* Row 2: Email & Phone Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[14px] font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                  Email Address *
                </label>
                <input
                  type="email"
                  className="w-full p-3 border-2 border-gray-200 rounded-xl outline-none font-semibold text-gray-800 transition-all focus:border-[#063a67] focus:bg-white bg-gray-50"
                  value={data.email_address}
                  onChange={(e) => setData({ ...data, email_address: e.target.value })}
                  placeholder="example@s2s.edu.com"
                  required
                />
              </div>
              <div>
                <label className="block text-[14px] font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="w-full p-3 border-2 border-gray-200 rounded-xl outline-none font-semibold text-gray-800 transition-all focus:border-[#063a67] focus:bg-white bg-gray-50"
                  value={data.mobile_no}
                  onChange={(e) =>
                    setData({ ...data, mobile_no: e.target.value })
                  }
                  placeholder="Contact number"
                />
              </div>
            </div>

            <div className="w-full h-[1px] bg-gray-100 my-2"></div>

            {/* Row 3: Security Verification Node */}
            <div>
              <label className="block text-[14px] font-bold text-[#063a67] mb-1.5 uppercase tracking-wide bg-blue-50/50 p-2 rounded-lg border border-blue-100/40">
                Security Challenge: What city were you born in? *
              </label>
              <input
                type="text"
                className="w-full p-3 border-2 border-gray-200 rounded-xl outline-none font-semibold text-gray-800 transition-all focus:border-[#063a67] focus:bg-white bg-gray-50"
                value={data.SecAnswer}
                onChange={(e) =>
                  setData({ ...data, SecAnswer: e.target.value })
                }
                placeholder="Verification baseline metric code"
                required
              />
            </div>

            <div className="w-full h-[1px] bg-gray-100 my-2"></div>

            {/* Row 4: Password Vault Structs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[14px] font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                  Password *
                </label>
                <input
                  type="password"
                  className="w-full p-3 border-2 border-gray-200 rounded-xl outline-none font-semibold text-gray-800 transition-all focus:border-[#063a67] focus:bg-white bg-gray-50"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  placeholder="••••••••"
                  required
                />
              </div>
              <div>
                <label className="block text-[14px] font-bold text-gray-700 mb-1.5 uppercase tracking-wide">
                  Confirm Security Password *
                </label>
                <input
                  type="password"
                  className="w-full p-3 border-2 border-gray-200 rounded-xl outline-none font-semibold text-gray-800 transition-all focus:border-[#063a67] focus:bg-white bg-gray-50"
                  value={data.repassword}
                  onChange={(e) =>
                    setData({ ...data, repassword: e.target.value })
                  }
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Submission Action Group */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-gray-100 mt-8">
              <button
                type="submit"
                className="w-full sm:w-auto text-white cursor-pointer bg-[#063a67] text-center rounded-xl px-10 py-3.5 outline-none transition-all duration-200 text-[16px] font-bold hover:bg-gradient-to-r hover:from-[#da4a0c] hover:to-[#e60b45] hover:scale-105 shadow-md border-none"
              >
                Deploy Admin
              </button>

              <Link
                to={"/adminprofile"}
                className="w-full sm:w-auto no-underline"
              >
                <button
                  type="button"
                  className="w-full sm:w-auto text-gray-500 cursor-pointer bg-gray-100 hover:bg-gray-200 text-center rounded-xl px-10 py-3.5 outline-none transition-all duration-200 text-[16px] font-bold border-none"
                >
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default AddAdmin;
