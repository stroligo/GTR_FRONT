import React, { useContext } from "react";
import GlobalContext from "../../contexts/GlobalContext";

export default function Labels() {
  const { labels, updateLabel } = useContext(GlobalContext);
  return (
    <React.Fragment key={crypto.randomUUID({ disableEntropyCache: true })}>
      <p className="text-gray-500 font-bold mt-10 text-sm md:text-base ">Label</p>
      {labels.map(({ label: lbl, checked }, idx) => (
        <label key={crypto.randomUUID({disableEntropyCache : true})} className="items-center mt-3 block">
          <input
            type="checkbox"
            checked={checked}
            onChange={() =>
              updateLabel({ label: lbl, checked: !checked })
            }
            className={`form-checkbox h-5 w-5 ${lbl} rounded focus:ring-0 cursor-pointer`}
          />
          <span className="ml-2 text-gray-700 capitalize">{lbl}</span>
        </label>
      ))}
    </React.Fragment>
  );
}
