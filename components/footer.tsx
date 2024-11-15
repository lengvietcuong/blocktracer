import Logo from "@/components/icons/logo";
import { TbMail as EmailIcon } from "react-icons/tb";
import { PiPhoneBold as PhoneIcon } from "react-icons/pi";
import { PiMapPin as LocationIcon } from "react-icons/pi";
import { FaFacebook as FacebookIcon } from "react-icons/fa";
import { FaInstagram as InstagramIcon } from "react-icons/fa";
import { FaYoutube as YouTubeIcon } from "react-icons/fa";
import { FaXTwitter as TwitterIcon } from "react-icons/fa6";
import { FaTiktok as TikTokIcon } from "react-icons/fa";
import { IconType } from "react-icons";

// Type definitions for social network and contact item properties
interface SocialNetworkProps {
  Icon: IconType;
  name: string;
}

interface ContactItemProps {
  Icon: IconType;
  text: string;
  href: string;
}

function SocialNetwork({ Icon, name }: SocialNetworkProps) {
  // Renders a social network icon with a hyperlink to the respective homepage
  return (
    <li>
      <a
        href={`https://www.${name}.com`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={name}
      >
        <Icon className="size-6 transition-colors hover:text-primary" />
      </a>
    </li>
  );
}

function ContactItem({ Icon, text, href }: ContactItemProps) {
  // Renders a contact item (e.g., email, phone, location) as an icon with text and a hyperlink
  return (
    <a
      className="flex items-center text-sm text-muted-foreground hover:text-foreground"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon className="mr-2 size-4 flex-shrink-0" />
      {text}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="border-t bg-background px-6 py-8 md:px-8 lg:px-12 xl:px-28">
      <div className="mx-auto max-w-screen-2xl">
        <div className="flex flex-col gap-6 md:flex-row md:justify-between">
          {/* Left section with logo and contact details */}
          <div className="flex flex-col justify-center gap-6 lg:flex-row lg:gap-8">
            <div className="flex items-center gap-3">
              <Logo className="size-8 fill-primary lg:size-12" />
              <p className="font-bold lg:hidden">Block Tracer</p>
            </div>
            <div className="max-w-sm space-y-3">
              <ContactItem
                Icon={EmailIcon}
                text="support@blocktracer.com"
                href="mailto:lengvietcuong@gmail.com"
              />
              <ContactItem
                Icon={PhoneIcon}
                text="+84 899 150 016"
                href="tel:+84899150016"
              />
              <ContactItem
                Icon={LocationIcon}
                text="Ho Chi Minh City, Viet Nam"
                href="https://maps.google.com?q=A35+Bach+Dang+Street,+Tan+Binh+District,+Ho+Chi+Minh+City,+Viet+Nam"
              />
            </div>
          </div>

          <hr className="md:hidden" />
          
          {/* Right section with social network icons */}
          <div className="flex justify-center gap-8 md:gap-12">
            <ul className="flex justify-center gap-8 md:gap-12">
              <SocialNetwork Icon={FacebookIcon} name="Facebook" />
              <SocialNetwork Icon={InstagramIcon} name="Instagram" />
              <SocialNetwork Icon={TwitterIcon} name="Twitter" />
              <SocialNetwork Icon={TikTokIcon} name="TikTok" />
              <SocialNetwork Icon={YouTubeIcon} name="YouTube" />
            </ul>
          </div>
        </div>
        {/* Footer text with copyright information */}
        <p className="mt-4 text-center text-sm text-muted-foreground">
          © 2024 Block Tracer
        </p>
      </div>
    </footer>
  );
}
