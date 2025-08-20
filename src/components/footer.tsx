"use client";
import ProjectApiList from "@/app/api/ProjectApiList";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loader from "./loader/Loader";
import Link from "next/link";
import { useHomeStore } from "@/app/store/homeStore";

interface FooterData {
  footer_logo: string;
  footer_title_1: string;
  address_title: string;
  address: string;
  contact_title: string;
  contact_no: string;
  email: string;
  company_name: string;
  company_title: string;

  quick_link_text: string;
  home_text: string;
  home_url: string;
  current_page_text: string;
  current_page_url: string;
  menu_text: string;
  menu_url: string;
  aboutus_text: string;
  aboutus_url: string;
  careers_text: string;
  careers_url: string;
  meet_out_team_text: string;
  meet_out_team_url: string;
  gift_card_text: string;
  gift_card_url: string;
  press_text: string;
  press_url: string;

  legal_title_text: string;
  terms_text: string;
  terms_url: string;
  cookie_text: string;
  cookie_url: string;
  privacy_text: string;
  privacy_url: string;
  accessibility_text: string;
  accessibility_url: string;
  applicant_text: string;
  applicant_url: string;
  mp_text: string;
  mp_url: string;
  supply_text: string;
  supply_url: string;
  fssai_text: string;
  fssai_url: string;

  facebook_image: string;
  insta_image: string;
  google_image: string;
  youtub_image: string;
  x_image: string;
  facebook_url: string;
  insta_url: string;
  x_url: string;
  google_url: string;
  youtub_url: string;
}

export default function Footer() {
  const { menuItems } = useHomeStore();
  const [loading, setLoading] = useState(true);
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [categoryData, setCategoryData] = useState<any>();
  const { api_getFooterData, api_getCategory } = ProjectApiList();

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(api_getCategory);
        setCategoryData(response?.data?.data);
      } catch (error) {
        console.error("Error fetching home data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryData();
  }, []);

  useEffect(() => {
    const fetchValueData = async () => {
      try {
        const response = await axios.get(api_getFooterData);
        setFooterData(response?.data?.data);
      } catch (error) {
        console.error("Error fetching home data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!footerData) {
      fetchValueData();
    } else {
      setLoading(false);
    }
  }, [footerData, api_getFooterData, setFooterData]);

  if (loading)
    return (
      <div className="fixed inset-0 z-50 h-full w-full flex items-center justify-center bg-white">
        <Loader />
      </div>
    );

  // console.log(categoryData, "categoryData---------------------->.");
  return (
    <footer className="bg-[#ed722e] text-black px-6 py-10 pt-50 max-sm:pt-10 text-sm md:text-base">
      <div className="max-w-7xl mx-auto grid grid-cols-1 max-sm:grid-cols-2 md:grid-cols-5 gap-8">
        {/* Contact Support */}
        <div className="space-y-4">
          <div>
            <Image
              src={
                footerData?.footer_logo
                  ? footerData?.footer_logo
                  : "/elephant.png"
              }
              alt="Elfo's Pizza"
              width={104}
              height={104}
            />
          </div>
          <div className="text-gray-900">
            <h3 className="font-bold text-black [font-family:'Barlow_Condensed',Helvetica] text-2xl">
              {footerData?.footer_title_1
                ? footerData?.footer_title_1
                : "CONTACT SUPPORT"}
            </h3>
            <div>
              <h4 className="font-semibold [font-family:'Barlow_Condensed',Helvetica] text-2xl">
                {footerData?.address_title
                  ? footerData?.address_title
                  : "ADDRESS"}
              </h4>
              <p>
                {footerData?.address
                  ? footerData?.address
                  : "Dolor Sit Amet Loren Ipsum"}
              </p>
            </div>
            <div>
              <h4 className="font-semibold [font-family:'Barlow_Condensed',Helvetica] text-2xl">
                {footerData?.contact_title
                  ? footerData?.contact_title
                  : "CONTACTS"}
              </h4>
              <p>
                {footerData?.contact_no
                  ? footerData?.contact_no
                  : "(601) 468-7817"}
              </p>
              <p>
                {footerData?.email ? footerData?.email : "info@elfospizza.com"}
              </p>
            </div>
            <p className="text-xs pt-4">
              {footerData?.company_name
                ? footerData?.company_name
                : "INDIA Limited"}

              <br />

              {footerData?.company_title
                ? footerData?.company_title
                : "© 2025 ESBY'S PIZZA"}
            </p>
          </div>
        </div>
        {/* Quick Links */}
        <div className="space-y-2">
          <h3 className="font-bold [font-family:'Barlow_Condensed',Helvetica] text-2xl">
            {footerData?.quick_link_text || "QUICK LINKS"}
          </h3>
          <ul className="space-y-1 text-gray-900 ">
            <li className="cursor-pointer hover:underline">
              <Link href={footerData?.home_url || "#"}>
                {footerData?.home_text || "Home"}
              </Link>
            </li>
            <li className="cursor-pointer hover:underline">
              <Link href={footerData?.current_page_url || "#"}>
                {footerData?.current_page_text || "Current page"}
              </Link>
            </li>
            <li className="cursor-pointer hover:underline">
              <Link href={footerData?.menu_url || "#"}>
                {footerData?.menu_text || "Menu"}
              </Link>
            </li>
            <li className="cursor-pointer hover:underline">
              <Link href={footerData?.aboutus_url || "#"}>
                {footerData?.aboutus_text || "About Us"}
              </Link>
            </li>
            <li className="cursor-pointer hover:underline">
              <Link href={footerData?.careers_url || "#"}>
                {footerData?.careers_text || "Careers"}
              </Link>
            </li>
            <li className="cursor-pointer hover:underline">
              <Link href={footerData?.meet_out_team_url || "#"}>
                {footerData?.meet_out_team_text || "Meet Our Team"}
              </Link>
            </li>
            <li className="cursor-pointer hover:underline">
              <Link href={footerData?.gift_card_url || "#"}>
                {footerData?.gift_card_text || "Gift Cards"}
              </Link>
            </li>
            <li className="cursor-pointer hover:underline">
              <Link href={footerData?.press_url || "#"}>
                {footerData?.press_text || "Press"}
              </Link>
            </li>
          </ul>
        </div>
        {/* Elfo's Menu */}
        <div className="space-y-2">
          <h3 className="font-bold [font-family:'Barlow_Condensed',Helvetica] text-2xl">
            ELFO&apos;S MENU
          </h3>
          <ul className="space-y-1 text-gray-900">
            {categoryData?.slice(0, 8).map((item: any, index: number) => (
              <li key={index}>
                <Link href={`/pages/menu`} className="hover:underline">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Legal */}
        <div className="space-y-2">
          <h3 className="font-bold [font-family:'Barlow_Condensed',Helvetica] text-2xl">
            {footerData?.legal_title_text
              ? footerData?.legal_title_text
              : "LEGAL"}
          </h3>
          <ul className="space-y-1 text-gray-900">
            <li className="cursor-pointer hover:underline">
              <Link href={footerData?.terms_url || "#"}>
                {footerData?.terms_text || "Terms & Conditions"}
              </Link>
            </li>
            <li className="cursor-pointer hover:underline">
              <Link href={footerData?.cookie_url || "#"}>
                {footerData?.cookie_text || "Cookie Policy"}
              </Link>
            </li>
            <li className="cursor-pointer hover:underline">
              <Link href={footerData?.privacy_url || "#"}>
                {footerData?.privacy_text || "Privacy Policy"}
              </Link>
            </li>
            <li className="cursor-pointer hover:underline">
              <Link href={footerData?.accessibility_url || "#"}>
                {footerData?.accessibility_text || "Accessibility Statement"}
              </Link>
            </li>

            <li className="cursor-pointer hover:underline">
              <Link href={footerData?.supply_url || "#"}>
                {footerData?.supply_text || "Supply Chains Act"}
              </Link>
            </li>
            <li className="cursor-pointer hover:underline">
              <Link href={footerData?.fssai_url || "#"}>
                {footerData?.fssai_text || "FSSAI LICENSE"}
              </Link>
            </li>
            <li className="cursor-pointer hover:underline">
              <Link href={footerData?.applicant_url || "#"}>
                {footerData?.applicant_text || "Applicant Privacy Notice"}
              </Link>
            </li>
            <li className="cursor-pointer hover:underline">
              <Link href={footerData?.mp_url || "#"}>
                {footerData?.mp_text || "MP Transparency In"}
              </Link>
            </li>
          </ul>
        </div>
        {/* Social Links */}
        <div className="space-y-2 flex flex-col items-center justify-center">
          <h3 className="font-bold [font-family:'Barlow_Condensed',Helvetica] text-2xl">
            SOCIAL LINKS
          </h3>
          <div className="flex gap-3 text-xl justify-center items-center">
            <a
              href={footerData?.facebook_url || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={footerData?.facebook_image || "/fb.png"}
                alt="Facebook"
                width={36}
                height={36}
              />
            </a>
            <a
              href={footerData?.insta_url || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={footerData?.insta_image || "/insta.png"}
                alt="Instagram"
                width={36}
                height={36}
              />
            </a>
            <a
              href={footerData?.x_url || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={footerData?.x_image || "/twitter.png"}
                alt="Twitter"
                width={36}
                height={36}
              />
            </a>
            <a
              href={footerData?.google_url || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={footerData?.google_image || "/google.png"}
                alt="Google"
                width={36}
                height={36}
              />
            </a>
            <a
              href={footerData?.youtub_url || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={footerData?.youtub_image || "/youtube.png"}
                alt="YouTube"
                width={36}
                height={36}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
