"use client";
import Image from "next/image";
import "./sidebar.css";
import { useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Input,
} from "@material-tailwind/react";

import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  HomeIcon,
  ShoppingCartIcon,
  UserIcon,
  ChartBarIcon,
  Bars3Icon,
  MapPinIcon,
  BuildingOfficeIcon
} from "@heroicons/react/24/solid";

import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Sidebar({ isopen, setIsOpen }) {
  const [open, setOpen] = useState(0);
  const [openAlert, setOpenAlert] = useState(true);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Card
      className={`h-[100vh]  max-w-[16rem] barr   ${
        isopen ? "" : "open"
      }  bg-[#e0e0e0] shadow-xl p-2 rounded-none shadow-blue-gray-900/5`}
    > 
      <div className="mb-2 flex items-center md:justify-center  justify-between gap-4 px-4 p-1">
        <Link href={"/admin"}>
          <div>
            {/* <Image src="https://docs.material-tailwind.com/img/logo-ct-dark.png" alt="brand" className="h-8 w-8" /> */}
            <Typography variant="h5" color="blue-gray">
              LWG ADMIN
            </Typography>
          </div>
        </Link>
        <div
          onClick={() => setIsOpen(isopen ? false : true)}
          className="p-3 md:hidden bg-gray-200 rounded-lg"
        >
          <Bars3Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="p-2">
        <Input
          className="bg-white"
          icon={<MagnifyingGlassIcon className="h-5 w-5" />}
          label="Search"
        />
      </div>
      <List className="text-sm">
      <Link href={"/admin"}>
        <ListItem>
          <ListItemPrefix>
            <HomeIcon className="h-5 w-5" />
          </ListItemPrefix>
          Home
        </ListItem>
        </Link>
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 1 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <Link href={"/admin/orders"}>
            <ListItem className="p-0 " selected={open === 1}>
              <AccordionHeader
                onClick={() => handleOpen(1)}
                className="border-b-0 p-3"
              >
                <ListItemPrefix>
                  <ShoppingCartIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography
                  color="blue-gray"
                  className="mr-auto text-sm font-normal"
                >
                  Order
                </Typography>
              </AccordionHeader>
            </ListItem>
          </Link>
          <AccordionBody className="py-1">
            <List className="p-0 text-sm">
              <Link href={"/admin/checkouts"}>
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Abandoned checkouts
                </ListItem>
              </Link>
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 2 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <Link href={"/admin/products?page=1"}>
            <ListItem className="p-0" selected={open === 2}>
              <AccordionHeader
                onClick={() => handleOpen(2)}
                className="border-b-0 p-3"
              >
                <ListItemPrefix>
                  <ShoppingBagIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography
                  color="blue-gray"
                  className="mr-auto text-sm  font-normal"
                >
                  Products
                </Typography>
              </AccordionHeader>
            </ListItem>
          </Link>
          <AccordionBody className="py-1">
            <List className="p-0 text-sm">
              <Link href={"/admin/collections"}>
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Collections
                </ListItem>
              </Link>
              {/* <Link href={"/admin/producttype"}>
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Product Type
                </ListItem>
              </Link> */}
            </List>
          </AccordionBody>
        </Accordion>
        <Accordion
          open={open === 3}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 2 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <Link href={"/admin/customers"}>
            <ListItem className="p-0" selected={open === 3}>
              <AccordionHeader
                onClick={() => handleOpen(3)}
                className="border-b-0 p-3"
              >
                <ListItemPrefix>
                  <UserIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography
                  color="blue-gray"
                  className="mr-auto text-sm  font-normal"
                >
                  Customers
                </Typography>
              </AccordionHeader>
            </ListItem>
          </Link>
          <AccordionBody className="py-1">
            <List className="p-0 text-sm">
              <Link href={"/admin/segments"}>
                <ListItem>
                  <ListItemPrefix>
                    <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                  </ListItemPrefix>
                  Segments
                </ListItem>
              </Link>
            </List>
          </AccordionBody>
        </Accordion>
        {/* <hr className="my-2 border-blue-gray-50" /> */}
        <Link href={"/admin/locations"}>
        <ListItem>
          <ListItemPrefix>
            <MapPinIcon className="h-5 w-5" />
          </ListItemPrefix>
          Location
 
        </ListItem>
        </Link>
        <Link href={"/admin/brands"}>
        <ListItem>
          <ListItemPrefix>
            <BuildingOfficeIcon className="h-5 w-5" />
          </ListItemPrefix>
          Brands
         
        </ListItem>
        </Link>
        <ListItem>
          <ListItemPrefix>
            <ChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          Analytics
          {/* <ListItemSuffix>
            <Chip
              value="14"
              size="sm"
              variant="ghost"
              color="blue-gray"
              className="rounded-full"
            />
          </ListItemSuffix> */}
        </ListItem>
      </List>
    </Card>
  );
}
