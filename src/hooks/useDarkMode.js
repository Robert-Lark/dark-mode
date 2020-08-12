import react from "react";
import useLocalStorage from "./useLocalStorage";

const useDarkMode = () => {
    const [someValue, setSomeValue] = useLocalStorage('your key here')
}

export default useDarkMode