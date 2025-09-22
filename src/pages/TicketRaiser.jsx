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
    const ticketFetch = async () => {
      try {
        const res = await AdminAxios.post("/admin/ticket");
        setCard(res.data)
      } catch (err) {
        console.error(err)
      }
    }
    ticketFetch()
  }, [])
  return (
    <div className="w-full min-h-screen bg-gray-50 text-gray-900">
      {/* Navbar */}
      <Navbar
        field={[
          { link: "/admin", name: "Profile" },
          { link: "/donate/request-list", name: "Donate" },
          { link: "/reciver/blood", name: "Blood" },
          { link: "/about", name: "About" },
          { link: "/", name: "Logout" },
        ]}
      />

      {/* Ticket Form Modal */}
      <TicketForm vari={modal} fn={setModal} />

      {/* Ticket Raiser Button & Tickets */}
      <div className="relative top-0 left-0 pt-20 pb-5 px-10 flex gap-x-4 gap-y-4 flex-wrap">
        {/* Ticket Raiser Button */}
        <div
          onClick={() => setModal(true)}
          className="fixed flex gap-x-2 cursor-pointer items-center top-20 right-5 bg-gray-200 text-gray-900 px-4 py-2 rounded-md shadow-md hover:bg-gray-300 transition-all duration-200"
        >
          <ImTicket />
          <h1 className="font-Poppins">Ticket Raiser</h1>
        </div>

        {/* Ticket Cards */}
        {card && card.map((item, index) => (
          <Ticket key={index} data={item} />
        ))}
      </div>
    </div>

  );
}

export default TicketRaiser