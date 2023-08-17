import { cartContext } from "@/global/context";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { BiSolidUserCircle } from "react-icons/bi";
import { GrClose } from "react-icons/gr";

const SubComp = () => {
  const [isSliderProfileOpen, setSliderProfileOpen] = useState(false);
  const [isUserEditingName, setIsUserEditingName] = useState(false);
  const [nameOf, setNameOf] = useState("");
  let {
    userData,
    Logout,
    sendEmailVarificationCode,
    updateUsernamePhoto,
    loading,
  } = useContext(cartContext);
  let name = userData?.displayName;

  function handleEditName() {
    updateUsernamePhoto(nameOf);
    setIsUserEditingName(false);
    window.location.reload();
  }
  return (
    <div className="overflow-hidden">
      {userData ? (
        <button
          onClick={() => {
            setSliderProfileOpen(true);
          }}
        >
          <BiSolidUserCircle size={40} />
        </button>
      ) : (
        <div className="flex items-center gap-3">
          <Link href={"/signup"}>
            <button className="rounded-lg bg-[#0F172A] p-2 text-white">
              Sign Up
            </button>
          </Link>
          <Link href={"/signin"}>
            <button className="rounded-lg bg-[#0F172A] p-2 text-white">
              Sign In
            </button>
          </Link>
        </div>
      )}
      <div
        className={`${
          isSliderProfileOpen
            ? "visible translate-y-0"
            : "invisible -translate-y-full"
        } duration-500 w-80 bg-gray-800 h-full absolute right-0 top-0 bottom-0 z-30 p-4`}
      >
        <div className="flex justify-between items-center">
          <h6 className="font-semibold text-2xl text-white">Profile</h6>
          <div
            onClick={() => {
              setSliderProfileOpen(false);
            }}
          >
            <GrClose size={25} className="text-white cursor-pointer" />
          </div>
        </div>
        {userData && (
          <div>
            <div className="flex flex-col gap-2 my-5">
              {loading && <div>Loading....</div>}
              {isUserEditingName && (
                <div className="flex gap-2">
                  <input
                    value={nameOf}
                    onChange={(e) => {
                      setNameOf(e.target.value);
                    }}
                    placeholder="New Name"
                    className="p-2 rounded-lg w-[225px]"
                  />
                  <button
                    onClick={handleEditName}
                    className="rounded-lg bg-slate-400 p-2"
                  >
                    Done
                  </button>
                </div>
              )}
              <h3 className="text-white">Name: {name ? name : "Not Set"}</h3>
              {!name && (
                <button
                  onClick={() => {
                    setIsUserEditingName(true);
                  }}
                  className="rounded-lg bg-slate-400 p-2"
                >
                  Edit Name
                </button>
              )}
              <h3 className="text-white">Email: {userData.email}</h3>
              <h3 className="text-white">
                Email Status:{" "}
                {userData.emailVerified ? "Verified" : "Not Verified"}
              </h3>
              <button
                className="rounded-lg bg-slate-400 p-2"
                onClick={sendEmailVarificationCode}
              >
                Verify Email
              </button>
            </div>
            <button
              onClick={Logout}
              className="w-full rounded-lg bg-slate-400 p-2"
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubComp;
