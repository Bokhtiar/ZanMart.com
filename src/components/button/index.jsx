import { Battambang } from "next/font/google"
import { MdKeyboardArrowRight } from "react-icons/md"

export const AllViewButton=()=>{
return(
<span className="flex text-sm text-primary font-semibold items-center rounded-full px-3 justify-between gap-2 py-1 border-primary border-2">View All <MdKeyboardArrowRight/> </span>
)
}