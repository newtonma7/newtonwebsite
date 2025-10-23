import Greeting from "@/components/Greeting";
import { motion } from "motion/react"

export default function Home() {

  
  return (
    // 1st div is the background and centers it all
    // 2nd div contains the below nav bar and the greeting componnet + spline
    // 3rd div contains the greeting + spline
    <div className ="min-h-screen bg-[#EDE7E4] flex items-center justify-center">
      <div className="flex flex-row">
        <div className = "flex"> 
          <Greeting/>
        </div>
      </div>
    </div>
  );
}
