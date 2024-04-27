import { FaCity } from "react-icons/fa";
import { FaTent, FaTents } from "react-icons/fa6";
import { GiIsland, GiTreehouse } from "react-icons/gi";
import {
  MdApartment,
  MdCabin,
  MdCastle,
  MdHouseboat,
  MdOutlineVilla,
} from "react-icons/md";
import { PiBedBold, PiLighthouse } from "react-icons/pi";

export const CATEGORIES = [
  {
    label: "Lighthouse",
    icon: PiLighthouse,
    description:
      "Entire houses for rent, offering privacy and space for families or groups.",
  },
  {
    label: "apartment",
    icon: MdApartment,
    description:
      "Modern apartments in urban areas, perfect for solo travelers or couples.",
  },
  {
    label: "villa",
    icon: MdOutlineVilla,
    description:
      "Luxurious villas with private pools and stunning views, ideal for a relaxing getaway.",
  },
  {
    label: "cabin",
    icon: MdCabin,
    description:
      "Cozy cabins nestled in the woods or mountains, providing a rustic retreat close to nature.",
  },
  {
    label: "Beach",
    icon: GiIsland,
    description:
      "Entire houses for rent, offering privacy and space for families or groups.",
  },
  {
    label: "bed n breakfast",
    icon: PiBedBold,
    description:
      "Charming bed and breakfast accommodations offering personalized service and homemade breakfast.",
  },
  {
    label: "condo",
    icon: FaCity,
    description:
      "Comfortable condos with resort amenities such as pools, gyms, and spas, perfect for a leisurely stay.",
  },
  {
    label: "tent",
    icon: FaTent,
    description:
      "Camping tents and glamping sites for outdoor enthusiasts seeking an adventurous experience.",
  },
  {
    label: "boat",
    icon: MdHouseboat,
    description:
      "Unique boat rentals for a memorable stay on the water, from houseboats to sailing yachts.",
  },
  {
    label: "treehouse",
    icon: GiTreehouse,
    description:
      "Quirky treehouses perched amidst lush foliage, offering a one-of-a-kind stay for the young at heart.",
  },
  {
    label: "castle",
    icon: MdCastle,
    description:
      "Historic castles and palaces available for exclusive rental, allowing guests to live like royalty.",
  },
];
