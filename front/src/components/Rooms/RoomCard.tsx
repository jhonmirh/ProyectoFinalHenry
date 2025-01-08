import React from "react";
import Image from "next/image"; 
import { FaStar } from "react-icons/fa";
import { Room } from "@/interfaces";
import Link from "next/link";

const RoomCard: React.FC<Room> = ({ roomType, title, size, beds, rating = 0, image, price, id }) => {
  
    return (
      <div className="w-80 h-96 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-blur border-light-dark hover:-translate-y-1">
        <Link href={`/rooms/${id}`}>

          <div className="relative" style={{ height: "50%" }}>
            <Image
              src={image}
              alt={title}
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute top-2 right-2 text-sm font-semibold py-1 px-2 rounded-lg shadow-md">
              ${price} / noche
            </div>
          </div>
  

          <div className="h-1/2 p-4 flex flex-col justify-between">
            <div>
              <h2 className=" text-sm uppercase tracking-wide">{roomType}</h2>
              <h1 className="font-bold text-lg mt-1 truncate">{title}</h1>
              <p className=" text-sm mt-2">{size}</p>
            </div>
            <div className="mt-4 border-t pt-4 flex items-center justify-between">
              <p className=" text-sm">{beds} camas</p>
              <div className="flex items-center">
                {Array.from({ length: 5 }, (_, i) => (
                  <FaStar
                    key={i}
                    className={`text-lg ${i < rating ? "text-yellow-500" : "text-gray-300"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  };
  
  export default RoomCard;