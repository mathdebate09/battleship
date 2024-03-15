import myIcon from "../assets/images/blue-ship.svg";

const link = document.createElement("link");
link.rel = "icon";
link.href = `${myIcon}`;
document.head.appendChild(link);
