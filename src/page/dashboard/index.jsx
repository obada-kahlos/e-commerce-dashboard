import React from "react";
import { MdcinAvatar, MdcinBox, MdcinButton, MdcinInput, MdcinProfileSearchCart, MdcinText } from 'mdcin-ui-v1'

export const Dashboard = () => {


  return <div>
    <div className="w-full h-screen flex items-center justify-center gap-4 ">
      {/* <MdcinBox paddingValue="10px" shadow="small" height="300px" rounded="medium" width="800px" display="flex" justifyContent="center" alignItems="center">
        <div className="m-1 flex flex-col gap-y-2">
          <MdcinButton value="Mdcin button" size="large" color="success" variant="contained" onClick={() => alert('hi')} />
          <MdcinButton value="Mdcin button" size="large" color="danger" variant="contained" />
          <MdcinButton value="Mdcin button" size="large" color="primary" variant="contained" />
          <MdcinButton value="Mdcin button" size="large" color="disable" variant="contained" disabled={true} />
        </div>
        
        <div className="m-1 flex flex-col gap-y-2">
          <MdcinAvatar size="medium" userType="organization" />
          <MdcinAvatar size="medium" userType="individual" />
        </div>
        <div className="m-1 flex flex-col gap-y-2">
          <MdcinInput border="light" height="40px" padding="10px" rounded="small" placeholder="Mdcin Input" width="300px" />
          <MdcinInput border="primary" height="40px" padding="10px" rounded="small" placeholder="Mdcin Input" width="300px" />
          <MdcinInput border="none" height="40px" padding="10px" rounded="small" placeholder="Mdcin Input" width="300px" />
        </div>
      </MdcinBox> */}

      <MdcinText color="#191919" size="large" value="Ammar website" weight="400" />
    </div>
  </div>;
};
