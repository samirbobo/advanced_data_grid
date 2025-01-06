import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next) // Connects react-i18next with i18next.
  .init({
    resources: {
      en: {
        translation: {
          // Here, place the texts for the English language.
          employee: "EMPLOYEE",
          employeeAddTitle: "Add New Employee",
          employeeEditTitle: "Update Employee",
          employeeDeleteTitle: "Delete Employee",
          confirmMessage: "Are You Sure To Delete This Item ?",
          alterMessage: "Something went wrong. Please try again later.",
          delete: "Delete",
          submit: "Submit",
        },
      },
      ar: {
        translation: {
          // Here, place the texts for the Arabic language.
          employee: "الموظفين",
          employeeAddTitle: "اضافه موظف جديد",
          employeeEditTitle: "تحديث الموظف",
          employeeDeleteTitle: "حذف الموظف",
          confirmMessage: "هل أنت متأكد من حذف هذا العنصر ؟",
          alterMessage: "حدث خطأ ما. يرجى المحاولة مرة أخرى في وقت لاحق.",
          delete: "حذف",
          submit: "تاكيد",
        },
      },
    },
    lng: "en", // Default language
    fallbackLng: "en", // he fallback language if a translation is not available.
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
