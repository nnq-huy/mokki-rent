'use client'
import { Reservation } from "@prisma/client"
import Avatar from "../Avatar";
import useCurrentReservation from "@/app/hooks/useCurrentReservation";

interface LeftPanelProps {
  reservations: Reservation[]
}

const LeftPanel : React.FC<LeftPanelProps> = ({reservations})=>{
  const {setCurrentReservation} = useCurrentReservation();
  return (
		<div className="flex">
      <div className="
        overflow-y-auto 
        shadow-lg
        bg-gray-50
        w-20 
        sm:w-20 
        md:w-64 
        border-r-2
        border-gray-200
      ">
            <div className="flex px-5 py-2 justify-between">
                <h2 className="
                      overflow-hidden 
                      -z-10 
                      sm:-z-10 
                      md:z-0 
                      sm:p-0 
                      md:px-5 
                      text-md 
                      font-medium 
                      text-gray-600 
                ">
                  Reservation as as guest
                </h2>
              </div>
              <div className="space-y-4">
                <hr/>
                  <ul>
                    {reservations.map((reservation)=>(
                    <li key={reservation.id}>
                      <button
                        className="
                          flex 
                          items-center 
                          w-full 
                          px-3 
                          py-2 
                          gap-x-2 
                          hover:bg-gray-200 
                          focus:outline-none"
                        onClick={()=>{setCurrentReservation(reservation)}}
                      >
                        <Avatar src={reservation.hostPhoto}/>
                        <div className=" hidden md:block md:w-2/3 text-left rtl:text-right">
                        <div className="truncate text-xs text-gray-500 dark:text-gray-400">
                          Host name :
                        </div>
                          <h1 className="truncate text-sm font-semibold text-gray-700 capitalize dark:text-white">
                            {reservation.hostName}
                          </h1>
                        </div>
                      </button>
                    </li>
                  ))}
									</ul>
              </div>
          </div>
      </div>
    );
}

export default LeftPanel;