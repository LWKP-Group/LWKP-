import { redirect } from "next/navigation";

export default function NotFound() {
  redirect("/"); // redirect

  return null; // 🔥 IMPORTANT
}
