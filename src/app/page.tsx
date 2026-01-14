
import { redirect } from "next/navigation";

//URL opens sign in.
export default function Home() {
  redirect("/signin");
}
