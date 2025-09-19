import React, { useState, useEffect } from 'react'
import Navbar from '../utils/Navbar'
import Ticket from '../components/Ticket';
import { ImTicket } from "react-icons/im";
import TicketForm from '../components/TicketForm';
import AdminAxios from "../config/AdminAxios"
const TicketRaiser = () => {
    const [modal, setModal] = useState(false);
    const [card, setCard] = useState();
    useEffect(() => {
        const ticketFetch = async ()=>{
            try{
                const res = await AdminAxios.post("/admin/ticket");
                setCard(res.data)
            }catch(err){
                console.error(err)
            }
        }
        ticketFetch()
     }, [])
  return (
    <div className="w-full min-h-screen bg-black text-white">
      <Navbar
        field={[
          { link: "/admin", name: "Profile" },
          { link: "/donate/request-list", name: "Donate" },
          { link: "/reciver/blood", name: "Blood" },
          { link: "/about", name: "About" },
          { link: "/", name: "Logout" },
        ]}
      />
      
    <TicketForm vari={modal} fn={setModal}/>
      <div className="relative tpo-0 left-0 pt-20 pb-5 px-10 flex gap-x-4 gap-y-4 flex-wrap">
        <div
        onClick={()=> setModal(true)}
         className="fixed flex gap-x-2 cursor-pointer items-center top-20 right-5 bg-zinc-700 px-4 py-2 rounded-md">
          <ImTicket />
          <h1>Ticket Raiser</h1>
        </div>
        {card && card.map((item, index)=> <Ticket key={index} data={item} /> )}
      </div>
    </div>
  );
}

export default TicketRaiser