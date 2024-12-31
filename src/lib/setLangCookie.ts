"use server";
import { cookies } from "next/headers";

export async function setNLCookie() {
  cookies().set("lang", "nl");
}

export async function setENCookie() {
    cookies().set("lang", "en");
  }
  
