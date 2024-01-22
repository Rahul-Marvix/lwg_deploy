import Link from "next/link";
import { adminAxiosInstance } from "@/utils/axiosUtils";

import { revalidatePath } from "next/cache";
import CustomerTable from "@/components/admin/customers/CustomerTable";

export const revalidate=0
export default async function page({ searchParams }) {
  // let { page = 1, search = "" } = searchParams;
  const page =
    typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;
  let users = [];
  const reFetch = async () => {
    "use server";
    let path = "/admin/customers";
    if (page) path += "?page=" + page;
    if (search) path += search ? "&search=" + search : "";

    revalidatePath(path);
  };
  try {
    const response = await adminAxiosInstance.get(
      `/auth/getuser?page=${page}&search=${search ? search : ""}`
    );
    if (response.data.success) {
      users = response.data.users;
    }
  } catch (error) {
    console.log(error);
  }
  // console.log(response.data.users);
  return (
    <div>
      <main className="px-4 pt-4">
        <CustomerTable users={users} page={page} search={search} />
      </main>
    </div>
  );
}
