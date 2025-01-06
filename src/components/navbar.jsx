import { useContext } from "react";
import { Box, IconButton, useTheme, Container } from "@mui/material";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import { ColorModeContext } from "../theme";
import SelectedMenu from "./SelectedMenu";
import { EG, US } from "country-flag-icons/react/3x2";
import { useTranslation } from "react-i18next"; // استيراد الترجمة

const options = [
  {
    name: "English",
    icon: <US title="United States" style={{ width: 25 }} />,
  },
  { name: "العربيه", icon: <EG title="Egypt" style={{ width: 25 }} /> },
];

const Navbar = () => {
  const colorMode = useContext(ColorModeContext);
  const theme = useTheme();
  const { i18n } = useTranslation(); // استخدام i18next

  return (
    <Box
      sx={{
        py: 1,
        background: theme.palette.navBg.main,
        direction: i18n.language === "ar" ? "rtl" : "ltr", // تغيير الاتجاه بناءً على اللغة
      }}
    >
      <Container sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {theme.palette.mode === "light" ? (
          <IconButton
            onClick={() => {
              localStorage.setItem(
                "mode",
                theme.palette.mode === "dark" ? "light" : "dark"
              );
              colorMode.toggleColorMode();
            }}
          >
            <LightModeOutlined fontSize="small" sx={{ color: "#000" }} />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => {
              localStorage.setItem(
                "mode",
                theme.palette.mode === "dark" ? "light" : "dark"
              );
              colorMode.toggleColorMode();
            }}
          >
            <DarkModeOutlined fontSize="small" />
          </IconButton>
        )}

        <SelectedMenu options={options} />
      </Container>
    </Box>
  );
};

export default Navbar;
