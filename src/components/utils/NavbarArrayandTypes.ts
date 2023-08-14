export interface NavbarItemType {
  label: string;
  href: string;
  isDropDown: boolean;
  dropDownData?: Array<NavbarItemType>;
}

export const NavbarArray: Array<NavbarItemType> = [
  {
    label: "Women",
    href: "/women",
    isDropDown: true,
    dropDownData: [
      {
        label: "Dresses",
        href: "/women/dress",
        isDropDown: false,
      },
      {
        label: "Shirts",
        href: "/women/shirts",
        isDropDown: false,
      },
      {
        label: "Pants",
        href: "/women/pants",
        isDropDown: false,
      },
      {
        label: "Jackets",
        href: "/women/jackets",
        isDropDown: false,
      },
      {
        label: "Sweaters",
        href: "/women/sweater",
        isDropDown: false,
      },
    ],
  },
  {
    label: "Men",
    href: "/men",
    isDropDown: true,
    dropDownData: [
      {
        label: "Sweaters",
        href: "/men/sweater",
        isDropDown: false,
      },
      {
        label: "Pants",
        href: "/men/pants",
        isDropDown: false,
      },
      {
        label: "Jackets",
        href: "/men/jackets",
        isDropDown: false,
      },
    ],
  },
  {
    label: "Kids",
    href: "/kids",
    isDropDown: true,
    dropDownData: [
      {
        label: "Shirts",
        href: "/kids/shirts",
        isDropDown: false,
      },
      {
        label: "Pants",
        href: "/kids/pants",
        isDropDown: false,
      },
      {
        label: "Jackets",
        href: "/kids/jackets",
        isDropDown: false,
      },
    ],
  },
  {
    label: "All Products",
    href: "/products",
    isDropDown: false,
  },
];
