import React, { useState } from "react";

const tipsData = [
  {
    id: 1,
    title: "Benefits of Blood Donation",
    image: "https://providencemedicalassociates.org/wp-content/uploads/2025/02/give-blood.jpg",
    content:
      "Donating blood regularly can improve heart health, stimulate blood cell production, and help save lives. Every donation can save up to 3 lives!",
  },
  {
    id: 2,
    title: "Myths vs Facts",
    image: "https://www.shutterstock.com/shutterstock/videos/3888306293/thumb/4.jpg?ip=x480",
    content:
      "Myth: Blood donation is painful. Fact: The process is quick and safe. Myth: I can't donate if I have tattoos. Fact: You can donate after a waiting period.",
  },
  {
    id: 3,
    title: "Donation Guidelines",
    image: "https://www.shutterstock.com/image-vector/charity-social-campaign-generous-donation-600nw-2480522853.jpg",
    content:
      "Donors should be 18-65 years old, weigh at least 50kg, and be healthy. Eat well, stay hydrated, and avoid alcohol before donating.",
  },
  {
    id: 4,
    title: "Eligibility Criteria",
    image: "https://preview.redd.it/blood-donors-in-sweden-get-a-text-each-time-they-save-v0-bbufxkolxe4d1.jpeg?auto=webp&s=04e55c35ddbb4591d4cd5445134edfb4c405292d",
    content:
      "Check hemoglobin levels, recent medical conditions, and travel history. Only eligible donors should donate to ensure safety for both donor and recipient.",
  },
  {
    id: 5,
    title: "Frequency of Donation",
    image: "https://www.shutterstock.com/image-vector/blood-donor-tiny-people-character-600nw-1141569941.jpg",
    content:
      "Men can donate every 12 weeks and women every 16 weeks. Maintaining proper intervals keeps your body healthy.",
  },
  {
    id: 6,
    title: "Hydration & Nutrition",
    image: "https://images.405magazine.com/wp-content/uploads/2025/05/shutterstock_1967884306-746x418.jpg",
    content:
      "Drink plenty of water and have a healthy meal before donating. This helps prevent dizziness or fatigue after donation.",
  },
  {
    id: 7,
    title: "Post-Donation Care",
    image: "https://cdn.baptistjax.com//image/upload/c_fill,g_auto,f_auto,q_auto,w_580/v1621949089/Juice/Donating_Blood_2_Juice_Hero_580x335.jpg",
    content:
      "Rest for 10-15 minutes after donation, avoid heavy exercise, and keep the bandage on for a few hours. Stay hydrated to help your body recover quickly.",
  },
];

const AwarenessSection = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleCard = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  // Split tipsData into 3 columns
  const columns = [[], [], []];
  tipsData.forEach((tip, index) => {
    columns[index % 3].push(tip);
  });

  return (
    <div className="bg-gray-50 py-16 px-6 lg:px-32">
      <h2 className="text-4xl font-[oswald] text-center text-red-700 mb-12">
        Blood Donation Awareness
      </h2>

      <div className="flex flex-col md:flex-row gap-8">
        {columns.map((col, colIndex) => (
          <div key={colIndex} className="flex flex-col gap-8 flex-1">
            {col.map((tip) => (
              <div
                key={tip.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-105 flex flex-col"
                onClick={() => toggleCard(tip.id)}
              >
                <img
                  src={tip.image}
                  alt={tip.title}
                  className="w-full h-48 object-cover flex-shrink-0"
                />
                <div className="p-6 flex flex-col">
                  <h3 className="text-2xl font-[oswald] text-red-700 mb-2">
                    {tip.title}
                  </h3>
                  {expandedCard === tip.id && (
                    <p className="text-gray-700 text-lg mt-2">{tip.content}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AwarenessSection;
