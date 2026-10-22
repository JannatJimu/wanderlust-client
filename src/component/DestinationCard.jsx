import { Button } from "@heroui/react";
import { FiArrowUpRight } from "react-icons/fi";
import Image from "next/image";
import { LuMapPin, LuClock3 } from "react-icons/lu";
import Link from "next/link";

const DestinationCard = ({ destination }) => {
  const {
    _id,
    imageUrl,
    price,
    destinationName,
    duration,
    country,
  } = destination;

  return (
    <article className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(13,148,136,0.14)]">

      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <Image
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          alt={destinationName}
          src={imageUrl}
          height={500}
          width={500}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />

        {/* Location Badge */}
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/30 bg-white/90 px-3.5 py-2 text-sm font-medium text-gray-800 shadow-lg backdrop-blur-md">
          <LuMapPin size={16} className="text-teal-600" />
          <span>{country}</span>
        </div>

        {/* Price */}
        <div className="absolute bottom-4 left-4 text-white">
          <p className="mb-1 text-xs font-medium tracking-wide text-white/80">
            STARTING FROM
          </p>
          <p className="text-3xl font-extrabold tracking-tight">
            ${price}
          </p>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-2 text-xs font-semibold text-gray-800 shadow-md backdrop-blur-sm">
          <LuClock3 size={15} className="text-teal-600" />
          {duration}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        <div className="mb-4">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-teal-600">
            Discover & Explore
          </p>

          <h2 className="line-clamp-1 text-xl font-bold tracking-tight text-gray-900 transition-colors duration-300 group-hover:text-teal-700">
            {destinationName}
          </h2>

          <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
            Discover the beauty of {destinationName} and make
            unforgettable memories on your next adventure.
          </p>
        </div>

        {/* Divider */}
        <div className="mb-4 border-t border-gray-100" />

        {/* Footer */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-gray-400">Your next adventure</p>
            <p className="mt-1 text-sm font-semibold text-gray-700">
              Explore the world
            </p>
          </div>

          <Link href={`/destinations/${_id}`}>
            <Button
              className="min-w-0 rounded-full bg-teal-600 px-4 font-semibold text-white shadow-sm transition-all duration-300 hover:bg-teal-700 hover:shadow-lg"
              endContent={<FiArrowUpRight size={18} />}
            >
              Explore
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default DestinationCard;
