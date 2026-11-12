import { SERVICE_MENU_ITEMS } from "@/data/content";

/* desktop-only dropdown under the "Service" link (hidden < 768px by CSS) */
export default function ServiceMenu() {
  return (
    <div className="svc-menu">
      <ul className="svc-menu__card">
        {SERVICE_MENU_ITEMS.map(({ label, href, icon }) => (
          <li key={href}>
            <a className="svc-menu__item" href={href}>
              <img src={icon} alt="" width={15} height={15} />
              <span>{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
