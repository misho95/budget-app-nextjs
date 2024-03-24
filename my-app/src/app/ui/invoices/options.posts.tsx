"use client";

import { useState } from "react";
import { DeleteInvoice, EditInovice } from "./buttons";
import { Settings } from "lucide-react";

type PropsType = {
  id: string;
};

const OptionsPosts = ({ id }: PropsType) => {
  const [openSettings, setOpenSettings] = useState(false);

  return (
    <>
      <button onClick={() => setOpenSettings(!openSettings)}>
        <Settings className="size-5" />
      </button>
      {openSettings && (
        <div>
          <DeleteInvoice id={id} />
          <EditInovice id={id} />
        </div>
      )}
    </>
  );
};

export default OptionsPosts;
