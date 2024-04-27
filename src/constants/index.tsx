import {
  Barn,
  Bed,
  Boat,
  Building,
  BuildingApartment,
  CastleTurret,
  House,
  Island,
  Lighthouse,
  Tent,
  Tree,
  Warehouse,
} from "@phosphor-icons/react";
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
    icon: Lighthouse,
    description:
      "Entire houses for rent, offering privacy and space for families or groups.",
  },
  {
    label: "apartment",
    icon: BuildingApartment,
    description:
      "Modern apartments in urban areas, perfect for solo travelers or couples.",
  },
  {
    label: "villa",
    icon: Warehouse,
    description:
      "Luxurious villas with private pools and stunning views, ideal for a relaxing getaway.",
  },
  {
    label: "cabin",
    icon: Barn,
    description:
      "Cozy cabins nestled in the woods or mountains, providing a rustic retreat close to nature.",
  },
  {
    label: "Beach",
    icon: Island,
    description:
      "Entire houses for rent, offering privacy and space for families or groups.",
  },
  {
    label: "bed n breakfast",
    icon: Bed,
    description:
      "Charming bed and breakfast accommodations offering personalized service and homemade breakfast.",
  },
  {
    label: "condo",
    icon: Building,
    description:
      "Comfortable condos with resort amenities such as pools, gyms, and spas, perfect for a leisurely stay.",
  },
  {
    label: "tent",
    icon: Tent,
    description:
      "Camping tents and glamping sites for outdoor enthusiasts seeking an adventurous experience.",
  },
  {
    label: "boat",
    icon: Boat,
    description:
      "Unique boat rentals for a memorable stay on the water, from houseboats to sailing yachts.",
  },
  {
    label: "treehouse",
    icon: Tree,
    description:
      "Quirky treehouses perched amidst lush foliage, offering a one-of-a-kind stay for the young at heart.",
  },
  {
    label: "castle",
    icon: CastleTurret,
    description:
      "Historic castles and palaces available for exclusive rental, allowing guests to live like royalty.",
  },
];
