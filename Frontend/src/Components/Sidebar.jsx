import { assets } from "../assets/assets.js";

export default function Sidebar() {
  return (
    <div className="sidebar flex flex-col gap-2 h-auto">
      <a href="#">
        <img className="rounded-full" src={assets.chad} alt="user" /> Adonis
        Chad
      </a>

      <a href="#">
        <img src={assets.circle} alt="ai_circle" /> Glowup AI
      </a>

      <a href="#">
        <img src={assets.friends} alt="friends" /> Friends
      </a>

      <a href="#">
        <img src={assets.saved} alt="saved" /> Saved
      </a>

      <a href="#">
        <img src={assets.groups} alt="groups" /> Groups
      </a>

      <a href="#">
        <img src={assets.video} alt="video" /> Video
      </a>

      <a href="#">
        <img src={assets.market} alt="market" /> Market
      </a>

      <a href="#">
        <img src={assets.feeds} alt="feeds" /> Feeds
      </a>

      <a href="#">
        <img src={assets.events} alt="events" /> Events
      </a>

      <a href="#">
        <img src={assets.down} alt="see_more" /> See more
      </a>
    </div>
  );
}
