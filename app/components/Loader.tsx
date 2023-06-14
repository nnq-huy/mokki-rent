'use client';

import { PuffLoader } from "react-spinners";

const Loader = () => {
  return (
    <div
      className="
      h-[80vh]
      flex
      flex-col
      justify-center
      items-center
    "
    >
      <PuffLoader
        size={100}
        color='#028446'
      />
    </div>
  );
}

export default Loader;