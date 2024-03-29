import { Outlet } from "react-router-dom";
import { SidebarWithContentSeparator } from "../components/navbar/navbar";
import { useState } from "react";

export const Root = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebarButtonData = () => {
    setShowSidebar((prev) => !prev);
  };

  return (
    <div>
      <div className="">
        <div className="">
          <div className="responsiveAside">
            <SidebarWithContentSeparator
              toggleSidebarButtonData={toggleSidebarButtonData}
            />
          </div>
        </div>
        <div className="">
          <Outlet />
        </div>
      </div>
      {showSidebar && (
        <div
          onClick={toggleSidebarButtonData}
          className="fixed w-full h-screen top-0 left-0 bg-[rgba(187,187,187,0.3)] z-[999]"
        ></div>
      )}
      <div className="fixed bottom-8 right-8">
        <button
          onClick={toggleSidebarButtonData}
          className="rounded-full w-16 h-16 flex items-center justify-center bg-[#fff]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M3 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 5.25Zm0 4.5A.75.75 0 0 1 3.75 9h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <style>
        {`
                    body{
                        background-color : #f3f3f3;
                      }
                      aside{
                        height : calc(100vh - 73px);
                        margin-top : 73px;
                        box-shadow: 0 3px 3px rgba(99, 97, 97, 0.16);
                        border-top-right-radius : 10px;
                        z-index : 1004;
                      }
                      aside::-webkit-scrollbar {
                            display: none;
                      }
                      .main-section{
                        margin-top : 73px;
                        border-top-left-radius : 10px;
                        border-bottom-left-radius : 10px;
                        box-shadow: 0 3px 3px rgba(99, 97, 97, 0.16);
                      }
                      .navbar{
                        box-shadow: 0 3px 3px rgba(99, 97, 97, 0.16);
                      }
                      .responsiveAside{
                        margin-top: 0;
                        position: fixed;
                        left: ${showSidebar ? "0" : "-300%"};
                        top: 0;
                        width: 300px;
                        height: 100%;
                        z-index: 9999;
                        transition: 0.5s;
                        border-radius: 10px;
                        z-index: 999999;
                        border-top-right-radius : 10px;
                      }
             
					  ::-webkit-scrollbar {
						width: 20px;
					}
			
					::-webkit-scrollbar-track {
						background-color: transparent;
					}
			
					::-webkit-scrollbar-thumb {
						/* background-color: #d6dee1; */
						background-color: #a8bbbf90;
						border-radius: 20px;
						border: 6px solid transparent;
						background-clip: content-box;
					}
			
					::-webkit-scrollbar-thumb:hover {
						background-color: #a8bbbf;
					}
                    `}
      </style>
    </div>
  );
};
