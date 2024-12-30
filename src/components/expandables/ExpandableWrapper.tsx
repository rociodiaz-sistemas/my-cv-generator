import { Box } from "@mui/material";

interface ExpandableWrapperProps {
  isExpanded: boolean;
  children: React.ReactNode;
  maxWidth?: string;
  width?: string;
}

export const ExpandableWrapper: React.FC<ExpandableWrapperProps> = ({
  isExpanded,
  children,
  maxWidth = "20vw",
  width = "60%",
}) => {
  return (
    <Box
      sx={{
        marginLeft: "2rem",
        height: "80%",
        width: isExpanded ? width : "0%",
        maxWidth: maxWidth,
        display: "block",
        wordBreak: "break-word",
        padding: "1rem",
        overflow: "auto",
        transition: "width 0.3s",
        borderLeft: isExpanded ? "1px solid #ccc" : "none",
      }}
    >
      {children}
    </Box>
  );
};
