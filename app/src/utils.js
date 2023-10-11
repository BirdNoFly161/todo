import { days, months } from "./constants";

export const formatDate = function(dateString){
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDay();

    return `${days[day]} ${months[month]} ${year}`
}