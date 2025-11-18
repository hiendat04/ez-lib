import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
export interface BookCardProps {
  id: string;
  title: string;
  author: string;
  totalCopies: number;
  availableCopies: number;
  coverImageUrl: string;
  detailLink: string;
}

export interface FeatureSectionCardProps {
  icon: OverridableComponent<SvgIconTypeMap<object, "svg">>;
  title: string;
  description: string;
}

export interface FeatureTitleProps {
  title: string;
  subtitle: string;
  titleColor?: string;
  subtitleColor?: string;
}

export interface StepCardProps {
  step: number;
  stepName: string;
  stepDetails: string;
}

export interface FooterSectionProps {
  title: string;

  links: string[];
}
