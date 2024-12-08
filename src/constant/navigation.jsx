import { PiTelevisionFill } from "react-icons/pi";
import { MdMovieCreation } from "react-icons/md";
import { MdHome, MdSearch } from "react-icons/md";

export const navigation = [
  {
    label: "TV Shows",
    href: "tv",
    icon: <PiTelevisionFill />,
  },
  {
    label: "Movies",
    href: "movie",
    icon: <MdMovieCreation />,
  },
];

export const mobileNavigation = [
  {
    label: "Home",
    href: "/",
    icon: <MdHome />,
  },
  {
    label: "TV Shows",
    href: "tv",
    icon: <PiTelevisionFill />,
  },
  {
    label: "Movies",
    href: "movie",
    icon: <MdMovieCreation />,
  },
  {
    label: "search",
    href: "/search",
    icon: <MdSearch />,
  },
];
