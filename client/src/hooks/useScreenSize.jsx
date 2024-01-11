import { useMediaQuery } from "@react-hook/media-query";

export default function useScreenSize() {
  const isVerySmallScreen = useMediaQuery("(max-width: 450px)");
  const isSmallScreen = useMediaQuery("(max-width: 36rem)");
  const isTabletScreen = useMediaQuery("(max-width: 912px)");
  const isLargeScreen = useMediaQuery("(min-width: 900px)");

  return {
    isSmallScreen,
    isLargeScreen,
    isVerySmallScreen,
    isTabletScreen,
  };
}
