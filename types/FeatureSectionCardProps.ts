import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export interface FeatureSectionCardProps {
  icon: OverridableComponent<SvgIconTypeMap<object, "svg">>;
  title: string;
  description: string;
}
