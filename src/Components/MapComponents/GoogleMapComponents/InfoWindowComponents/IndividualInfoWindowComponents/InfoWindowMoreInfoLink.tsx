import { Link } from "@mui/material";
import { InfoWindowFieldComponent } from "./InfoWindowFieldComponent";

interface InfoWindowLinkTypes {
  labelStyles: any;
  fieldTextStyles: any;
  href: string;
  linkStyles: any;
  linkText: string;
  fieldText: any;
  label: string;
}

export const InfoWindowMoreInfoLink = ({
  labelStyles,
  fieldTextStyles,
  href,
  linkStyles,
  linkText,
  label,
}: InfoWindowLinkTypes) => {
  return (
    <>
      <InfoWindowFieldComponent
        label={"Link to More Info:"}
        labelStyles={labelStyles}
        fieldTextStyles={fieldTextStyles}
        fieldText={
          <Link
            component="a"
            href={href}
            sx={linkStyles}
            target="_blank"
            rel="noreferrer"
          >
            {linkText}
          </Link>
        }
      />
    </>
  );
};
